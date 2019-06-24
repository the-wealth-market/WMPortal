/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Mobile;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
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

/**
 *
 * @author Saint
 */
public class MUserServlet extends HttpServlet {

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
            String ans = "";
            String json = "";
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
            String type = (String) jsonParameter.get("type");
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String result = "";
            switch (type) {
                case "BusinessRegistration": {
                    String memberuserid = (String) jsonParameter.get("memberuserid");
                    String bizindustry = (String) jsonParameter.get("bizindustry");
                    int BizIndustryID = Integer.parseInt(bizindustry);
                    String biztype = (String) jsonParameter.get("biztype");
                    int BizTypeID = Integer.parseInt(biztype);
                    String bizname = (String) jsonParameter.get("bizname");
                    String bizdfound = (String) jsonParameter.get("bizdfound");
                    String bizcacnumber = (String) jsonParameter.get("bizcacnumber");
                    String bizemail = (String) jsonParameter.get("bizemail");
                    String bizphone = (String) jsonParameter.get("bizphone");
                    String bizwebadd = (String) jsonParameter.get("bizwebadd");

                    String BizDescription = (String) jsonParameter.get("bizdesc");

                    Date DateFounded = UtilityManager.getSqlDateFromString(bizdfound);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    String Subclass2 = "Business";
                    String Status = "Activated";
                    int UserID = 0;
                    int BizgroupId = GeneralUserManager.getUserGroupID(Subclass2);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizemail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizphone)) {
                            String OfflineID = GeneralAccountManager.generateRandomNumber(8);
                            UserID = Integer.parseInt(memberuserid);
                            int BizUserID = GeneralUserManager.CreateUser(bizemail, bizphone, "", DateCreated, Status, BizgroupId, DateCreated, OfflineID);
                            if (BizUserID != 0) {
                                GeneralUserManager.CreateBusiness(BizUserID, bizname, BizTypeID, DateFounded, bizcacnumber, BizIndustryID, bizwebadd, BizDescription);
                                GeneralUserManager.LinkToUser(UserID, BizUserID, "Business", "Member");
                                String membermsgbdy = "Congratulations!!! You have been successfully registered your business of The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(1, membermsgbdy, "Business Created", BizUserID);
                                result = GeneralAccountManager.CreateAccountRecord(BizUserID);
                                String emailmsg = "Congratulations!!! You have been successfully your business on The WealthMarket. Welcome to the WealthMarket";
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Activation Code: " + regCode;
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                GeneralHistoryManager.LogActivity(BizUserID, "Registration", "Business Registration", "Registered on The WealthMarket");
                                String code = "200";
                                json1 = new Gson().toJson(code);
                                json2 = new Gson().toJson(result);
                                json = "[" + json1 + "," + json2 + "]";
                            } else {
                                result = "Something went wrong while creating Account";
                                String code = "400";
                                json1 = new Gson().toJson(code);
                                json2 = new Gson().toJson(result);
                                json = "[" + json1 + "," + json2 + "]";
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            String code = "400";
                            json1 = new Gson().toJson(code);
                            json2 = new Gson().toJson(result);
                            json = "[" + json1 + "," + json2 + "]";
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        String code = "400";
                        json1 = new Gson().toJson(code);
                        json2 = new Gson().toJson(result);
                        json = "[" + json1 + "," + json2 + "]";
                    }

                    break;
                }
                case "MemberRegistration": {
                    String userfirstname = (String) jsonParameter.get("userfirstname");
                    String userlastname = (String) jsonParameter.get("userlastname");
                    String userdob = (String) jsonParameter.get("userdob");
                    String usergender = (String) jsonParameter.get("usergender");
                    String useremail = (String) jsonParameter.get("useremail");
                    String userphone = (String) jsonParameter.get("userphone");
                    String userpassword = (String) jsonParameter.get("userpassword");

                    Date DateOfBirth = UtilityManager.getSqlDateFromString(userdob);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    String Subclass = "Member";
                    String Status = "Activated";
                    int MemberUserID = 0;
                    int UsergroupId = GeneralUserManager.getUserGroupID(Subclass);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(useremail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(userphone)) {
                            String OfflineID = GeneralAccountManager.generateRandomNumber(8);
                            MemberUserID = GeneralUserManager.CreateUser(useremail, userphone, userpassword, DateCreated, Status, UsergroupId, DateCreated, OfflineID);
                            if (MemberUserID != 0) {
                                GeneralUserManager.CreateMember(userfirstname, userlastname, DateOfBirth, usergender, MemberUserID);
                                String membermsgbdy = "Congratulations!!! You have been successfully registered as a member of The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(1, membermsgbdy, "Member Created", MemberUserID);
                                result = GeneralAccountManager.CreateAccountRecord(MemberUserID);
                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Welcome to the WealthMarket";
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Activation Code: " + regCode;

//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                GeneralHistoryManager.LogActivity(MemberUserID, "Registration", "Member Registration", "Registered on The WealthMarket");
                                String code = "200";
                                json1 = new Gson().toJson(code);
                                json2 = new Gson().toJson(result);
                                json = "[" + json1 + "," + json2 + "]";
                            } else {
                                result = "Something went wrong while creating Account";
                                String code = "400";
                                json1 = new Gson().toJson(code);
                                json2 = new Gson().toJson(result);
                                json = "[" + json1 + "," + json2 + "]";
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            String code = "400";
                            json1 = new Gson().toJson(code);
                            json2 = new Gson().toJson(result);
                            json = "[" + json1 + "," + json2 + "]";
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        String code = "400";
                        json1 = new Gson().toJson(code);
                        json2 = new Gson().toJson(result);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }
                case "getBusinessIndustries": {
                    ArrayList<Integer> ids = GeneralUserManager.getBusinessIndustryIds();
                    HashMap<String, String> industries = new HashMap<>();
                    ArrayList<HashMap<String, String>> bizindlist = new ArrayList<>();
                    if (!ids.isEmpty()) {
                        for (int i : ids) {
                            industries = GeneralUserManager.getBusinessIndustriesDetails(i);
                            bizindlist.add(industries);
                        }
                        json1 = new Gson().toJson(bizindlist);
                        json = "[" + json1 + "]";
                    }
                    break;
                }
                case "getBusinessTypes": {
                    String industryid = (String) jsonParameter.get("industryid");
                    int IndustryID = Integer.parseInt(industryid);
                    ArrayList<Integer> ids = GeneralUserManager.getBizTypesIds(IndustryID);
                    HashMap<String, String> biztypes = new HashMap<>();
                    ArrayList<HashMap<String, String>> biztypelist = new ArrayList<>();
                    if (!ids.isEmpty()) {
                        for (int i : ids) {
                            biztypes = GeneralUserManager.getBusinessTypesDetails(i);
                            biztypelist.add(biztypes);
                        }
                        json1 = new Gson().toJson(biztypelist);
                        json = "[" + json1 + "]";
                    }
                    break;
                }
                case "Login": {
                    String Email_PhoneNumber = (String) jsonParameter.get("emailphone");
                    String Password = (String) jsonParameter.get("password");
                    int UserID = 0;
                    String UserStatus = "";
                    if (GeneralUserManager.checkEmailAddressOrPhoneNumberExist(Email_PhoneNumber)) {
                        UserID = GeneralUserManager.checkPasswordEmailMatch(Password, Email_PhoneNumber);
                        if (UserID != 0) {
                            UserStatus = GeneralUserManager.getUserStatus(UserID);
                            if (UserStatus.equals("Activated")) {
                                GeneralUserManager.UpdateUserStatus(UserID, "Online");
                                HashMap<String, Object> userTableData = GeneralUserManager.getUserDetails(UserID);
                                HashMap<String, String> Tpin = new HashMap<>();
                                userTableData.put("Name", GeneralUserManager.getUserName(UserID));
                                int TransactionPin = GeneralAccountManager.GetUserTransactionPIN(UserID);
                                userTableData.put("TransactionPin", TransactionPin);
                                Tpin.put("TransactionPin", "" + TransactionPin);
                                String code = "200";
                                json1 = new Gson().toJson(code);
                                json2 = new Gson().toJson(userTableData);
                                json3 = new Gson().toJson(Tpin);
                                json = "[" + json1 + "," + json2 + "," + json3 + "]";
                            } else {
                                result = "Account hasn't been activated";
                                String code = "400";
                                json1 = new Gson().toJson(code);
                                json2 = new Gson().toJson(result);
                                json = "[" + json1 + "," + json2 + "]";
                            }
                        } else {
                            result = "Incorrect Login Parameters";
                            String code = "400";
                            json1 = new Gson().toJson(code);
                            json2 = new Gson().toJson(result);
                            json = "[" + json1 + "," + json2 + "]";
                        }
                    } else {
                        result = "Email or Phone Number Entered Doesn't Exist";
                        String code = "400";
                        json1 = new Gson().toJson(code);
                        json2 = new Gson().toJson(result);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }
                case "checkEmail": {
                    String typedEmail = (String) jsonParameter.get("email");
                    if (typedEmail.length() > 2) {
                        if (GeneralUserManager.checkEmailAddressOrPhoneNumberExist(typedEmail)) {
                            result = "Email exists";
                            json = new Gson().toJson(result);
                        } else {
                            result = "Available";
                            json = new Gson().toJson(result);
                        }
                        break;
                    } else {

                    }

                }
                case "GetUserConnects": {
                    String userID = (String) jsonParameter.get("userid");
                    String object1 = (String) jsonParameter.get("object1");
                    String object2 = (String) jsonParameter.get("object2");
                    int userid = Integer.parseInt(userID);
                    ArrayList<Integer> favids = GeneralUserManager.getUserFavorites(userid, object1, object2);
                    ArrayList<HashMap<String, String>> connectionlist = new ArrayList<>();
                    if (!favids.isEmpty()) {
                        for (int fav : favids) {
                            HashMap<String, String> FavDet = GeneralObjectManager.getObjectDetails(fav, object2);
                            connectionlist.add(FavDet);
                        }
                        String code = "200";
                        json1 = new Gson().toJson(code);
                        json2 = new Gson().toJson(connectionlist);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        String code = "400";
                        String message = "No results";
                        json1 = new Gson().toJson(code);
                        json2 = new Gson().toJson(message);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }
                case "SearchContacts": {
                    String UserInput = (String) jsonParameter.get("searchvalue");
                    ArrayList<Integer> allids = new ArrayList<>();
                    HashMap<String, Object> contdetails = new HashMap<>();
                    ArrayList<HashMap<String, Object>> contlist = new ArrayList<>();
                    if (!UserInput.equals("")) {
                        allids = GeneralUserManager.findMemberOrBusiness(UserInput);
                        if (!allids.isEmpty()) {
                            for (int i : allids) {
                                contdetails = GeneralUserManager.getUserDetails(i);
                                contdetails.put("email", GeneralUserManager.getUserEmail(i));
                                contlist.add(contdetails);
                            }
                            String code = "200";
                            json1 = new Gson().toJson(code);
                            json2 = new Gson().toJson(contlist);
                            json = "[" + json1 + "," + json2 + "]";
                        } else {
                            String code = "400";
                            String message = "none";
                            contdetails.put("empty", message);
                            contlist.add(contdetails);
                            json1 = new Gson().toJson(code);
                            json2 = new Gson().toJson(contlist);
                            json = "[" + json1 + "," + json2 + "]";
                        }
                    } else {
                        String message = "Sorry, No Contact Found";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "GetUserDetails": {
                    String userid = (String) jsonParameter.get("userid");
                    int id = Integer.parseInt(userid);
                    HashMap<String, Object> memberdetails = GeneralUserManager.getUserDetails(id);
                    json = new Gson().toJson(memberdetails);
                    break;
                }
                case "AddContact": {
                    String memberid = (String) jsonParameter.get("memberid");
                    int UserID = Integer.parseInt(memberid);
                    String contactID = (String) jsonParameter.get("contactid");
                    String Object1 = "Member";
                    String Object2 = "Contact";
                    int ContactID = Integer.parseInt(contactID);
                    int linkid = GeneralUserManager.LinkToUser(UserID, ContactID, Object1, Object2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (linkid != 0) {
                        String message = name + " has been added to your list";
                        GeneralHistoryManager.LogActivity(UserID, "Contact", "Added Contact", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = name + " already exist on your list";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "DeleteContact": {
                    String memberid = (String) jsonParameter.get("memberid");
                    int UserID = Integer.parseInt(memberid);
                    String contactID = (String) jsonParameter.get("contactid");
                    String Object1 = "Member";
                    String Object2 = "Contact";
                    int ContactID = Integer.parseInt(contactID);
                    result = GeneralUserManager.RemoveContact(UserID, ContactID, Object1, Object2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (result.equals("successful")) {
                        String message = name + " has been removed from your list";
                        GeneralHistoryManager.LogActivity(UserID, "Contact", "Remove Contact", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = "Something went wrong! try again Later";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "SwitchTo": {
                    String userid = (String) jsonParameter.get("userid");
                    int UserID = Integer.parseInt(userid);
                    GeneralUserManager.UpdateUserStatus(UserID, "Offline");
                    HashMap<String, Object> userTableData = GeneralUserManager.getUserDetails(UserID);
                    HashMap<String, String> Tpin = new HashMap<>();
                    int TransactionPin = GeneralAccountManager.GetUserTransactionPIN(UserID);
                    Tpin.put("TransactionPin", "" + TransactionPin);
                    String code = "200";
                    json1 = new Gson().toJson(code);
                    json2 = new Gson().toJson(userTableData);
                    json3 = new Gson().toJson(Tpin);
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
            }

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(MUserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(MUserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (java.text.ParseException ex) {
            Logger.getLogger(MUserServlet.class.getName()).log(Level.SEVERE, null, ex);
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
