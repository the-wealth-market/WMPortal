/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Mobile;

import com.Managers.AccountManager;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import wmengine.Managers.*;
import wmengine.Tables.Tables;

/**
 *
 * @author Saint
 */
public class MTransactionServlet extends HttpServlet {

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
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
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
        processRequest(request, response);
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

            StringBuilder sb = new StringBuilder();
            try {
                BufferedReader br = request.getReader();
                String str = null;
                while ((str = br.readLine()) != null) {
                    sb.append(str);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            JSONParser parser = new JSONParser();
            JSONObject jsonParameter = null;
            try {
                jsonParameter = (JSONObject) parser.parse(sb.toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            String json = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String result = "";
            String type = (String) jsonParameter.get("type");
            HashMap<String, String> details = new HashMap<>();
            switch (type) {
                case "GetUserAccountBalances": {
                    String userid = (String) jsonParameter.get("userid");
                    String AccountDefid = (String) jsonParameter.get("acctdefid");
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
                    json = new Gson().toJson(Balances);
                    break;
                }
                case "GetAccountDefinitions": {
                    ArrayList<Integer> DefIDS = GeneralAccountManager.Get_Users_Account_DefinitionIDs();
                    ArrayList<HashMap<String, String>> deflist = new ArrayList<>();
                    if (!DefIDS.isEmpty()) {
                        for (int id : DefIDS) {
                            HashMap<String, String> defdetails = GeneralAccountManager.Get_Account_Def_Details(id);
                            deflist.add(defdetails);
                        }
                        json1 = new Gson().toJson(deflist);
                        json = "[" + json1 + "]";
                    }

                    break;
                }
                case "GetAccounts": {
                    String userid = (String) jsonParameter.get("userid");
                    int userId = Integer.parseInt(userid);
                    ArrayList<Integer> DefIDS = GeneralAccountManager.Get_Users_Account_DefinitionIDs();
                    ArrayList<HashMap<String, String>> deflist = new ArrayList<>();
                    if (!DefIDS.isEmpty()) {
                        Collections.reverse(DefIDS);
                        for (int id : DefIDS) {
                            HashMap<String, String> defdetails = GeneralAccountManager.Get_Account_Def_Details(id);
                            int avail = GeneralAccountManager.GetUserAvailableBalance(userId, id);
                            defdetails.put("AccountBalance", "" + avail);
                            String UserAccountNumber = GeneralAccountManager.GetUserAccountNumber(userId, id);
                            defdetails.put("AccountNumber", UserAccountNumber);
                            deflist.add(defdetails);
                        }
                        json1 = new Gson().toJson(deflist);
                        json = "[" + json1 + "]";
                    }

                    break;
                }
                case "TransferToOfflineAccount": {
                    String memberid = (String) jsonParameter.get("memberid");
                    int UserID = Integer.parseInt(memberid);
                    String Amount = (String) jsonParameter.get("amount");
                    String pin = (String) jsonParameter.get("pin");
                    int Pin = Integer.parseInt(pin);
                    result = GeneralAccountManager.TransferToOffline(UserID, Amount, Pin);
                    json = new Gson().toJson(result);
                    break;
                }
                case "TransferFromOfflineAccount": {
                    String memberid = (String) jsonParameter.get("memberid");
                    int UserID = Integer.parseInt(memberid);
                    String Amount = (String) jsonParameter.get("amount");
                    String pin = (String) jsonParameter.get("pin");
                    int Pin = Integer.parseInt(pin);
                    result = GeneralAccountManager.TransferFromOffline(UserID, Amount, Pin);
                    json = new Gson().toJson(result);
                    break;
                }
                case "RecentTransactions": {
                    String memberid = (String) jsonParameter.get("memberid");
                    String AccountDefid = (String) jsonParameter.get("acctdefID");
                    String sDate = (String) jsonParameter.get("startdate");
                    String eDate = (String) jsonParameter.get("enddate");
                    Date StartDate = null;
                    Date EndDate = null;
                    StartDate = UtilityManager.getSqlDateFromString(sDate);
                    EndDate = UtilityManager.getSqlDateFromString(eDate);
                    int UserId = Integer.parseInt(memberid);
                    int AccountDefID = Integer.parseInt(AccountDefid);
                    ArrayList<Integer> transids = new ArrayList<>();
                    HashMap<String, String> transactiondetails = new HashMap<>();

                    ArrayList<HashMap<String, String>> transactionDetailsList = new ArrayList<>();
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
                                transactionDetailsList.add(transactiondetails);
                            }
                        }
                        String code = "200";
                        json1 = new Gson().toJson(code);
                        json2 = new Gson().toJson(transactionDetailsList);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        String empty = "empty";
                        String code = "400";
                        json1 = new Gson().toJson(code);
                        json2 = new Gson().toJson(empty);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }
                case "GetSearchUserDetails": {
                    String UserID = (String) jsonParameter.get("userid");
                    int userid = 0;
                    if (UserID != null) {
                        userid = Integer.parseInt(UserID);
                    }
                    String searchvalue = (String) jsonParameter.get("searchvalue");
                    HashMap<String, String> res = GeneralAccountManager.getSearchResult(searchvalue, userid);
                    json = new Gson().toJson(res);
                    break;
                }
                case "FundTransfer": {
                    String Comment = (String) jsonParameter.get("comment");
                    String userid = (String) jsonParameter.get("memberid");
                    String benid = (String) jsonParameter.get("Beneficiaryid");
                    String AccountDefid = (String) jsonParameter.get("acctdefid");
                    String amount = (String) jsonParameter.get("amount");
                    String Pin = (String) jsonParameter.get("pin");
                    int FromUserID = Integer.parseInt(userid);
                    int AccountDefID = Integer.parseInt(AccountDefid);
                    int ToUserID = Integer.parseInt(benid);
                    int TransferAmount = Integer.parseInt(amount);
                    int PIN = Integer.parseInt(Pin);
                    result = GeneralAccountManager.QuickTransfer(FromUserID, ToUserID, AccountDefID, PIN, TransferAmount, Comment);
                    if (result.equals("success")) {
                        result = "Transfer Successful";
                        json = new Gson().toJson(result);
                    } else {
                        json = new Gson().toJson(result);
                    }
                    break;
                }
                case "ChangeTransactionPIN": {
                    String userid = (String) jsonParameter.get("userid");
                    String pin = (String) jsonParameter.get("pin");
                    int UserID = Integer.parseInt(userid);
                    int PIN = Integer.parseInt(pin);
                    result = GeneralUserManager.UpdateTransactionPIN(UserID, PIN);
                    String msgbox = "Your New Transaction Pin is: " + PIN;
                    GeneralMessageManager.sendMemberMessage(1, msgbox, "New Transaction Pin", UserID);
                    GeneralHistoryManager.LogActivity(UserID, "Transaction PIN", "Changed Transaction PIN", "Changed Transaction PIN");
                    json = new Gson().toJson(result);
                    break;
                }
                case "ChangeOfflineID": {
                    String userid = (String) jsonParameter.get("userid");
                    String OfflineID = (String) jsonParameter.get("offlineid");
                    int UserID = Integer.parseInt(userid);
                    result = GeneralUserManager.UpdateOfflineID(UserID, OfflineID);
                    String msgbox = "Your New Offline ID is: " + OfflineID;
                    GeneralMessageManager.sendMemberMessage(1, msgbox, "New Offline ID", UserID);
                    GeneralHistoryManager.LogActivity(UserID, "Offline ID", "Changed Offline ID", "Changed Offline ID");
                    json = new Gson().toJson(result);
                    break;
                }
                case "AddPaymentCard": {
                    String userid = (String) jsonParameter.get("userid");
                    String card = (String) jsonParameter.get("card");
                    String year = (String) jsonParameter.get("year");
                    String cvc = (String) jsonParameter.get("cvc");
                    String month = (String) jsonParameter.get("month");
                    int UserID = Integer.parseInt(userid);
                    result = AccountManager.AddUserPaymentCard(UserID, card, year, cvc, month);
                    json = new Gson().toJson(result);
                    break;
                }
                case "AcctTypeBalance": {
                    String userid = (String) jsonParameter.get("userid");
                    String AccountDefid = (String) jsonParameter.get("acctdefid");
                    int userId = Integer.parseInt(userid);
                    int AccountDefID = Integer.parseInt(AccountDefid);
                    HashMap<String, Object> Balances = GeneralAccountManager.GetAccountBalances(userId, AccountDefID);
                    json = new Gson().toJson(Balances);
                    break;
                }
                case "GetPaymentCard": {
                    String userid = (String) jsonParameter.get("userid");
                    int UserID = Integer.parseInt(userid);
                    HashMap<String, String> res = AccountManager.getUserPaymentCard(UserID);
                    json = new Gson().toJson(res);
                    break;
                }
            }
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);

        } catch (ClassNotFoundException | SQLException | java.text.ParseException ex) {
            Logger.getLogger(MTransactionServlet.class.getName()).log(Level.SEVERE, null, ex);
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
