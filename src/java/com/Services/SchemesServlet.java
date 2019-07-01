/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import com.itextpdf.text.DocumentException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.*;

/**
 *
 * @author ndfmac
 */
public class SchemesServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException, SQLException, UnsupportedEncodingException, DocumentException, ParseException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String json = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            String result = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String json4 = "";
            HttpSession session = request.getSession(true);
            switch (type) {
                case "GetSempleContracts": {
                    String data[] = request.getParameterValues("data[]");
                    String userid = data[0];
                    String status = data[1];
                    int UserID = Integer.parseInt(userid);
                    ArrayList<Integer> SempleIds = GeneralSchemesManager.getSempleContractsByRecipientUserID(UserID);
                    HashMap<Integer, HashMap<String, String>> sempleList = new HashMap<>();
                    if (!SempleIds.isEmpty()) {
                        for (int sid : SempleIds) {
                            HashMap<String, String> details = GeneralSchemesManager.GetContractDetailsByStatus(sid, status);
                            if (!details.isEmpty()) {
                                sempleList.put(sid, details);
                            }
                        }
                        json = new Gson().toJson(sempleList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "RejectSempleContract": {
                    String contractid = request.getParameter("data").trim();
                    int ContractID = Integer.parseInt(contractid);
                    result = GeneralSchemesManager.UpdateContractStatus(ContractID, "Rejected");
                    json = new Gson().toJson(result);
                    break;
                }
                case "SignSempleContract": {
                    String[] data = request.getParameterValues("data[]");
                    String bizid = data[0].trim();
                    String contractid = data[1].trim();
                    String transpin = data[2].trim();
                    int ContractID = Integer.parseInt(contractid);
                    int BizID = Integer.parseInt(bizid);
                    int TransactionPin = Integer.parseInt(transpin);
                    int TPin = GeneralAccountManager.GetTransactionPIN(BizID);
                    if (TPin == TransactionPin) {
                        boolean result2 = GeneralSchemesManager.EditExistingPDFContract(BizID, ContractID);
                        if (result2 == true) {
                            result = "true";
                        } else {
                            result = "something went wrong";
                        }
                    } else {
                        result = "Invalid Transaction Pin";
                    }
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetAllMonetisationRules": {
                    HashMap<String, HashMap<String, Object>> rules = GeneralSchemesManager.GetMonetisationRules();
                    json = new Gson().toJson(rules);
                    break;
                }
                case "ApplyForMonetisation":{
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String actualamount = data[1].trim();
                    int AmountPD = Integer.parseInt(actualamount.split(":")[1]);
                    actualamount = actualamount.split(":")[0];
                    String trxref = data[2].trim();
                    String transcode = data[3].trim();
                    String paytype = data[4].trim();
                    String AppData = data[5].trim();
                    int MonRuleId = Integer.parseInt(AppData.split(";")[1]);
                    String appData = AppData.split(";")[0];
                    int UserID = Integer.parseInt(userid);
                    int WarrantsExpected = Integer.parseInt(actualamount);
                    String message = "";
                    /*String payresult = PayStackManager.getInstance().PayStackPay(trxref);
                    JSONParser parser = new JSONParser();
                    JSONObject jsonParameter = null;
                    try {
                        jsonParameter = (JSONObject) parser.parse(payresult);
                    } catch (Exception e) {
                        message = "Your payment validation was not successful, Please contact the admin if your account was debited and send prove of payment!";
                        json1 = new Gson().toJson(paytype);
                        json2 = new Gson().toJson(result);
                        String json3 = new Gson().toJson(message);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                        e.printStackTrace();
                    }
                    String Status = jsonParameter.get("status").toString();*/
                    String Status = "true";
                    if (Status.equals("false")) {
                        message = "Your payment validation was not successful, Please contact the admin if your account was debited and send prove of payment!";
                        json1 = new Gson().toJson(paytype);
                        json2 = new Gson().toJson(result);
                        json3 = new Gson().toJson(message);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";

                    }else if (Status.equals("true")) {
                        if (paytype.equals("Monetisation Application Fee")) {
                            result = GeneralSchemesManager.LogMonetisationApplication(MonRuleId, appData, UserID, AmountPD, WarrantsExpected, Status, transcode);
                            if(result.equals("success")){
                                message = "Successful";
                            }else{
                                message = "Failed";
                            }
                            
                            json1 = new Gson().toJson(paytype);
                            json2 = new Gson().toJson(result);
                            json3 = new Gson().toJson(message);
                            json = "[" + json1 + "," + json2 + "," + json3 + "]";
                        }
                    }
                    break;
                }
                case "SubmitMonetisationApplication":{
                    String[] data = request.getParameterValues("data[]");
                    String appData = data[0];
                    int MonRuleID = Integer.parseInt(data[1]);
                    int userid = Integer.parseInt(data[2]);
                    result = GeneralSchemesManager.SubmitMonetisationApplication(appData, MonRuleID, userid);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetMyMonApplications":{
                    int data = Integer.parseInt(request.getParameter("data"));
                    HashMap<String, HashMap<String, Object>> applications = GeneralSchemesManager.GetUserMonetisationApplications(data);
                    json = new Gson().toJson(applications);
                    break;
                }

            }
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (UnsupportedEncodingException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (DocumentException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, UnsupportedEncodingException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (DocumentException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
