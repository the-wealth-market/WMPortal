/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.Managers.AccountManager;
import com.google.gson.Gson;
import com.itextpdf.text.DocumentException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import wmengine.Managers.*;
import wmengine.Tables.Tables;

/**
 *
 * @author Saint
 */
public class AccountServlet extends HttpServlet {

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
            throws ServletException, IOException, SQLException, ClassNotFoundException, ParseException, UnsupportedEncodingException, DocumentException, Exception {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String type = request.getParameter("type");
            String json = "";
            String json1 = "";
            String json2 = "";
            String result = "";
            String empty = "none";
            switch (type) {
                case "GetUserAvailableBalance": {
                    int userId;
                    try {
                        userId = Integer.parseInt("" + session.getAttribute("Id"));
                    } catch (Exception e) {
                        json = new Gson().toJson(empty);
                        break;
                    }
                    int avail = GeneralAccountManager.GetUserAvailableBalance(userId, 1);
                    json = new Gson().toJson(avail);
                    break;
                }
                case "GetUserAccountDefinitions": {
                    HashMap<Integer, HashMap<String, String>> DefinitionList = new HashMap<>();
                    ArrayList<Integer> DefIDS = new ArrayList<>();
                    DefIDS = GeneralAccountManager.Get_Users_Account_DefinitionIDs();
                    if (!DefIDS.isEmpty()) {
                        for (int id : DefIDS) {
                            HashMap<String, String> defdetails = GeneralAccountManager.Get_Account_Def_Details(id);
                            DefinitionList.put(id, defdetails);
                        }
                        json = new Gson().toJson(DefinitionList);
                    } else {
                        json = new Gson().toJson(empty);
                    }

                    break;
                }
                case "GetUserAccountBalances": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String AccountDefid = data[1].trim();
                    int userId = Integer.parseInt(userid);
                    int AccountDefID = Integer.parseInt(AccountDefid);
                    HashMap<String, Object> Balances = GeneralAccountManager.GetAccountBalances(userId, AccountDefID);
                    String UserName = GeneralUserManager.getUserName(userId);
                    Balances.put("AccountName", UserName);
                    String UserAccountNumber = GeneralAccountManager.GetUserAccountNumber(userId, AccountDefID);
                    Balances.put("AccountNumber", UserAccountNumber);
                    String AccountDefName = GeneralAccountManager.GetAccountDefinitionName(AccountDefID);
                    Balances.put("AccountDefinitionName", AccountDefName);
                    HashMap<String, String> refRate = AccountManager.GetCurrentReflationRate();
                    Balances.put("Reflation_Discount", refRate.get(Tables.ReflationRates.Discount));
                    Balances.put("Reflation_Interest", refRate.get(Tables.ReflationRates.Interest));
                    Balances.put("ODLine_Balance", GeneralAccountManager.GetODLineAmountPayable(userId));
                    json = new Gson().toJson(Balances);
                    break;
                }
                case "GetUserTransactions": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String AccountDefid = data[1].trim();
                    Date StartDate = null;
                    Date EndDate = null;
                    String sDate = "";
                    String eDate = "";

                    if (!data[2].equals("null")) {
                        String DateRange = data[2].trim();
                        sDate = DateRange.split(":")[0].trim();
                        eDate = DateRange.split(":")[1].trim();
                    }
                    StartDate = UtilityManager.getSqlDateFromString(sDate);
                    EndDate = UtilityManager.getSqlDateFromString(eDate);
                    int UserId = Integer.parseInt(userid);
                    int AccountDefID = Integer.parseInt(AccountDefid);
                    ArrayList<Integer> transids = new ArrayList<>();
                    HashMap<String, String> transactiondetails = new HashMap<>();

                    HashMap<String, HashMap<String, String>> transactionDetailsList = new HashMap<>();
                    String UserAccountNumber = GeneralAccountManager.GetUserAccountNumber(UserId, AccountDefID);
                    if (StartDate != null && EndDate != null) {
                        ArrayList<String> TransactionIds = GeneralAccountManager.GetTransactionIDsByDates(StartDate, EndDate);
                        if (!TransactionIds.isEmpty()) {
                            for (String transactionid : TransactionIds) {
                                ArrayList<Integer> tranids = new ArrayList<>();
                                if (AccountDefID == 0) {
                                    tranids = GeneralAccountManager.GetTransactionIDsByAccountNumber(UserAccountNumber, transactionid);
                                } else {
                                    tranids = GeneralAccountManager.GetTransactionIDsByAccountDefinition(UserAccountNumber, transactionid, AccountDefID);
                                }
                                for (int i : tranids) {
                                    transids.add(i);
                                }
                            }
                            transids = new ArrayList<Integer>(new LinkedHashSet<Integer>(transids));
                        }
                    } else {
                        if (AccountDefID == 0) {
                            transids = GeneralAccountManager.GetTransactionIDs();
                        } else {
                            transids = GeneralAccountManager.GetTransactionIDsByUserIDAndAccountDefId(UserId, AccountDefID);
                        }
                    }
                    if (!transids.isEmpty()) {
                        for (int transactionID : transids) {
                            if (transactionID != 0) {
                                transactiondetails = GeneralAccountManager.GetTransactionDetails(transactionID);
                                transactionDetailsList.put("" + transactionID, transactiondetails);
                            }
                        }
                        json1 = new Gson().toJson(transids);
                        json2 = new Gson().toJson(transactionDetailsList);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetSearchUserDetails": {
                    String UserInput = request.getParameter("data");
                    HashMap<String, String> details = GeneralAccountManager.getSearchResult(UserInput, 0);
                    json = new Gson().toJson(details);
                    break;
                }
                case "InitPayment": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String amount = data[1].trim();
                    String email = data[2].trim();
                    int UserID = Integer.parseInt(userid);
//                    String paytype = data[4].trim();
                    int Amount = Integer.parseInt(amount);
                    result = PayStackManager.getInstance().InitiatePayStackPay(UserID, email, Amount, "Buy Warrants With Cash");
                    JSONParser parser = new JSONParser();
                    JSONObject jsonParameter = null;
                    try {
                        jsonParameter = (JSONObject) parser.parse(result.toString());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    String Status = jsonParameter.get("status").toString();
                    String Message = jsonParameter.get("message").toString();
                    Object datares = jsonParameter.get("data");
                    json1 = new Gson().toJson(Status);
                    json2 = new Gson().toJson(Message);
                    String json3 = new Gson().toJson(datares);
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "LoadPayStack": {
                    String tnrxref = request.getParameter("trxref");
                    String ref = request.getParameter("reference");
                    String payresult = PayStackManager.getInstance().PayStackPay(ref);
                    JSONParser parser = new JSONParser();
                    JSONObject jsonParameter = null;
                    try {
                        jsonParameter = (JSONObject) parser.parse(payresult);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    String Status = jsonParameter.get("status").toString();
                    if (Status.equals("false")) {
                        session.setAttribute("paymentStatus", "failed");
                    } else if (Status.equals("true")) {
                        session.setAttribute("paymentStatus", "success");
                    }
                    break;
                }

                case "ValidatePaystackTransaction": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String actualamount = data[1].trim();
                    String trxref = data[2].trim();
                    String transcode = data[3].trim();
                    String paytype = data[4].trim();
                    int MemberUserID = Integer.parseInt(userid);
                    int Amount = Integer.parseInt(actualamount);
                    String message = "";
                    String payresult = PayStackManager.getInstance().PayStackPay(trxref);
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
                    String Status = jsonParameter.get("status").toString();
                    if (Status.equals("false")) {
                        message = "Your payment validation was not successful, Please contact the admin if your account was debited and send prove of payment!";
                        json1 = new Gson().toJson(paytype);
                        json2 = new Gson().toJson(result);
                        String json3 = new Gson().toJson(message);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";

                    } else if (Status.equals("true")) {
                        if (paytype.equals("Inspection Fees")) {
                            result = GeneralAccountManager.CreateNewInventory(MemberUserID, 0, Amount, trxref, transcode, paytype, 0, "Cash");
                            if (result.equals("success")) {
                                message = "Your Payment was Successful.";
                            } else {
                                result = "warning";
                                message = "Something went wrong! We would fix it in no time!";
                            }
                            json1 = new Gson().toJson(paytype);
                            json2 = new Gson().toJson(result);
                            String json3 = new Gson().toJson(message);
                            json = "[" + json1 + "," + json2 + "," + json3 + "]";
                        } else if (paytype.equals("Validation Fees")) {
                            result = GeneralUserManager.ActivateUser(MemberUserID, Amount, trxref, transcode, paytype);
                            if (result.equals("success")) {
                                String email = GeneralUserManager.GetMemberEmail(MemberUserID);
                                String password = GeneralUserManager.GetMemberPassword(MemberUserID);
                                json1 = new Gson().toJson(paytype);
                                json2 = new Gson().toJson(result);
                                String json3 = new Gson().toJson(email);
                                String json4 = new Gson().toJson(password);
                                json = "[" + json1 + "," + json2 + "," + json3 + "," + json4 + "]";
                            } else {
                                json1 = new Gson().toJson(paytype);
                                json2 = new Gson().toJson(result);
                                String json3 = new Gson().toJson("Account validation was not successful!");
                                json = "[" + json1 + "," + json2 + "," + json3 + "]";
                            }

                        } else if (paytype.equals("Buy Warrants With Cash")) {
                            result = GeneralAccountManager.CreateNewInventory(MemberUserID, 0, Amount, trxref, transcode, paytype, 0, "Cash");
                            if (result.equals("success")) {
                                message = "Your Payment was Successful. Check your Messages for details";
                            } else {
                                result = "warning";
                                message = "Something went wrong! We would fix it in no time!";
                            }
                            json1 = new Gson().toJson(paytype);
                            json2 = new Gson().toJson(result);
                            String json3 = new Gson().toJson(message);
                            json = "[" + json1 + "," + json2 + "," + json3 + "]";
                        } else if (paytype.equals("Monetisation Application Fee")) {
                            int applicationID = MemberUserID;
                            result = GeneralSchemesManager.ImplementMoneisation(applicationID, Amount, Amount, trxref, transcode, Status, paytype);
                            if (result.equals("success")) {
                                message = "Your Payment was Successful. Check your Messages for details";
                            } else {
                                result = "warning";
                                message = "Something went wrong! We would fix it in no time!";
                            }
                            json1 = new Gson().toJson(paytype);
                            json2 = new Gson().toJson(result);
                            String json3 = new Gson().toJson(message);
                            json = "[" + json1 + "," + json2 + "," + json3 + "]";
                        }
                    }
                    break;
                }
                case "GetCurrentReflationRate": {
                    HashMap<String, String> refRate = AccountManager.GetCurrentReflationRate();
                    json = new Gson().toJson(refRate);
                    break;
                }
                case "QuickTransfer": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String benid = data[1].trim();
                    String AccountDefid = data[2].trim();
                    String amount = data[3].replaceAll(",", "");
                    String Pin = data[4].trim();
                    String Narration = data[5].trim();
                    int FromUserID = Integer.parseInt(userid);
                    int AccountDefID = Integer.parseInt(AccountDefid);
                    int ToUserID = Integer.parseInt(benid);
                    int TransferAmount = Integer.parseInt(amount);
                    int PIN = Integer.parseInt(Pin);
                    result = GeneralAccountManager.QuickTransfer(FromUserID, ToUserID, AccountDefID, PIN, TransferAmount, Narration);
                    json1 = new Gson().toJson(result);
                    json2 = new Gson().toJson(AccountDefid);
                    String json3 = new Gson().toJson(benid);
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GenerateUserTransactionStatement": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String AccountDefid = data[1].trim();
                    Date StartDate = null;
                    Date EndDate = null;
                    String sDate = "";
                    String eDate = "";

                    if (!data[2].equals("null")) {
                        String DateRange = data[2].trim();
                        sDate = DateRange.split(":")[0].trim();
                        eDate = DateRange.split(":")[1].trim();
                    }
                    StartDate = UtilityManager.getSqlDateFromString(sDate);
                    EndDate = UtilityManager.getSqlDateFromString(eDate);
                    int UserId = Integer.parseInt(userid);
                    int AccountDefID = Integer.parseInt(AccountDefid);
                    ArrayList<Integer> transids = new ArrayList<>();
                    ArrayList<HashMap<String, String>> StatementList = new ArrayList<>();
                    HashMap<String, String> transactiondetails = new HashMap<>();
                    String UserAccountNumber = GeneralAccountManager.GetUserAccountNumber(UserId, AccountDefID);
                    if (StartDate != null && EndDate != null) {
                        ArrayList<String> TransactionIds = GeneralAccountManager.GetTransactionIDsByDates(StartDate, EndDate);
                        if (!TransactionIds.isEmpty()) {
                            for (String transactionid : TransactionIds) {
                                ArrayList<Integer> tranids = new ArrayList<>();
                                if (AccountDefID == 0) {
                                    tranids = GeneralAccountManager.GetTransactionIDsByAccountNumber(UserAccountNumber, transactionid);
                                } else {
                                    tranids = GeneralAccountManager.GetTransactionIDsByAccountDefinition(UserAccountNumber, transactionid, AccountDefID);
                                }
                                for (int i : tranids) {
                                    transids.add(i);
                                }
                            }
                            transids = new ArrayList<Integer>(new LinkedHashSet<Integer>(transids));
                            transids = UtilityManager.removeDuplicatesIntegerArrayList(transids);
                        }
                    } else {
                        json = new Gson().toJson("Please select Date");
                    }
                    if (!transids.isEmpty()) {
                        for (int transactionID : transids) {
                            if (transactionID != 0) {
                                transactiondetails = GeneralAccountManager.GetTransactionDetails(transactionID);
                                StatementList.add(transactiondetails);
                            }
                        }
                        String AccountName = GeneralUserManager.getUserName(UserId);
                        int AccountBalance = GeneralAccountManager.GetUserAvailableBalance(UserId, 1);
                        String AcctDefName = GeneralAccountManager.GetAccountDefinitionName(AccountDefID);
                        boolean res = GeneralAccountManager.CreateAccountStatementPDF(UserId, StatementList, AcctDefName, UserAccountNumber, AccountName, AccountBalance, StartDate, EndDate);
                        if (res) {
                            json = new Gson().toJson("success");
                        } else {
                            json = new Gson().toJson("failed");
                        }
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "CheckDailyLimit": {
                    String data = request.getParameter("data");
                    int userid = Integer.parseInt(data);
                    result = GeneralAccountManager.CheckTransactionDailyLimit(userid);
                    json = new Gson().toJson(result);
                    break;
                }
                case "CheckDebitLimit": {
                    HashMap<String, ArrayList<String>> resend = new HashMap<>();
                    ArrayList<String> param = new ArrayList<>();
                    String[] data = request.getParameterValues("data[]");
                    for (int i = 0; i < data.length; i++) {
                        param.add(i, data[i]);
                    }
                    String amt = data[3].replaceAll(",", "");
                    int userid = Integer.parseInt(data[0]);
                    int amount = Integer.parseInt(amt);
                    result = GeneralAccountManager.CheckTransactionDebitLimit(userid, amount);
                    resend.put(result, param);
                    json = new Gson().toJson(resend);
                    break;
                }
                case "CheckCreditLimit": {
                    HashMap<String, ArrayList<String>> resend = new HashMap<>();
                    ArrayList<String> param = new ArrayList<>();
                    String[] data = request.getParameterValues("data[]");
                    for (int i = 0; i < data.length; i++) {
                        param.add(i, data[i]);
                    }
                    int receiverid = Integer.parseInt(data[1]);
                    String amt = data[3].replaceAll(",", "");
                    int userid = Integer.parseInt(data[0]);
                    int amount = Integer.parseInt(amt);
                    result = GeneralAccountManager.CheckTransactionCreditLimit(userid, receiverid, amount);
                    resend.put(result, param);
                    json = new Gson().toJson(resend);
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
            throws ServletException, IOException, UnsupportedEncodingException {
        try {
            processRequest(request, response);

        } catch (SQLException | ClassNotFoundException | ParseException ex) {
            Logger.getLogger(AccountServlet.class
                    .getName()).log(Level.SEVERE, null, ex);

        } catch (DocumentException ex) {
            Logger.getLogger(AccountServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(AccountServlet.class.getName()).log(Level.SEVERE, null, ex);
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

        } catch (SQLException | ClassNotFoundException | ParseException ex) {
            Logger.getLogger(AccountServlet.class
                    .getName()).log(Level.SEVERE, null, ex);

        } catch (DocumentException ex) {
            Logger.getLogger(AccountServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(AccountServlet.class.getName()).log(Level.SEVERE, null, ex);
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
