/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
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
 * @author Saint
 */
public class UserServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException, ParseException {
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
                case "Login": {
                    String[] data = request.getParameterValues("data[]");
                    String Email_PhoneNumber = data[0].trim();
                    String Password = data[1].trim();
                    String UserStatus = "";
                    int UserID = 0;
                    if (GeneralUserManager.checkEmailAddressOrPhoneNumberExist(Email_PhoneNumber)) {
                        UserID = GeneralUserManager.checkPasswordEmailMatch(Password, Email_PhoneNumber);
                        if (UserID != 0) {
                            int blocked = GeneralUserManager.CheckUserBlockedStatus(UserID);
                            if (blocked == 0) {
                                UserStatus = GeneralUserManager.getUserStatus(UserID);
                                if (UserStatus.equals("Activated")) {
                                    GeneralUserManager.UpdateUserStatus(UserID, "Online");
                                    session.setAttribute("UserOnlineOrOffline", "Online");
                                    session.setAttribute("Id", UserID);
                                    String username = GeneralUserManager.getUserName(UserID);
                                    session.setAttribute("username", username);
                                    String usertype = GeneralUserManager.GetUserGroupNameByUserID(UserID);
                                    session.setAttribute("usertype", usertype);
                                    result = "success";
//                                HistoryManager.LogActivity(UserID, "Access", "Successful Login", "Logged In");
                                    json = new Gson().toJson(result);
                                } else {
                                    result = "Account has not been activated";
                                    session.setAttribute("ValID", UserID);
                                    session.setAttribute("ValEmail", Email_PhoneNumber);
                                    json = new Gson().toJson(result);
                                }
                            } else {
                                result = "Blocked";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Incorrect Login Details";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Email or Phone Number Entered Doesn't Exist";
                        json = new Gson().toJson(result);

                    }
                    break;
                }

                case "DeleteUserAddress": {
                    String params = request.getParameter("data");
                    int AddressID = Integer.parseInt(params);
//                    HistoryManager.LogActivity(UserID, "Address", "Deleted Address", "Deleted Address");
                    result = GeneralUserManager.DeleteUserAddress(AddressID);
                    json = new Gson().toJson(result);
                    break;
                }
                case "MemberRegistration": {
                    String[] data = request.getParameterValues("data[]");
                    String userfirstname = data[0].trim();
                    String userlastname = data[1].trim();
                    String useremail = data[2].trim();
                    String userphone = data[3].trim();
                    String userpassword = data[4].trim();
                    String usergender = data[5].trim();
                    String userdob = data[6].trim();

                    Date DateOfBirth = UtilityManager.getSqlDateFromString(userdob);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    String Subclass = "Member";
                    String Status = "Not Activated";
                    int MemberUserID = 0;
                    int UsergroupId = GeneralUserManager.getUserGroupID(Subclass);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(useremail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(userphone)) {
                            String OfflineID = GeneralAccountManager.generateRandomNumber(6);
                            MemberUserID = GeneralUserManager.CreateUser(useremail, userphone, userpassword, DateCreated, Status, UsergroupId, DateCreated, OfflineID);
                            if (MemberUserID != 0) {
                                GeneralUserManager.CreateMember(userfirstname, userlastname, DateOfBirth, usergender, MemberUserID);
                                String membermsgbdy = "Congratulations!!! You have been successfully registered as a member of The WealthMarket.";
                                 GeneralUserManager.UpdateActivationDate(MemberUserID);
                                GeneralMessageManager.sendMemberMessage(1, membermsgbdy, "Member Created", MemberUserID);
                                result = GeneralAccountManager.CreateAccountRecord(MemberUserID);
                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Welcome to the WealthMarket";
                                session.setAttribute("Id", MemberUserID);
                                session.setAttribute("ValID", MemberUserID);
                                session.setAttribute("ValEmail", useremail);
                                session.setAttribute("ValUserName", userfirstname + userlastname);
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                GeneralHistoryManager.LogActivity(MemberUserID, "Registration", "Member Registration", "Registered on The WealthMarket");
                                json = new Gson().toJson(result);
                            } else {
                                result = "Something went wrong while creating User Account";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        json = new Gson().toJson(result);
                    }
                    break;
                }
                case "AddBankDetails": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String bknameid = data[1].trim();
                    String bkaccttype = data[2].trim();
                    String bkacctno = data[3].trim();
                    String bkbvn = data[4].trim();
                    int UserID = Integer.parseInt(userid);
                    int BankID = Integer.parseInt(bknameid);
                    result = GeneralUserManager.AddBankDetails(UserID, BankID, bkaccttype, bkacctno, bkbvn);
                    json = new Gson().toJson(result);
                    break;
                }
                case "ChangeTransactionPIN": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String pin = data[1].trim();
                    int UserID = Integer.parseInt(userid);
                    int PIN = Integer.parseInt(pin);
                    result = GeneralUserManager.UpdateTransactionPIN(UserID, PIN);
                    String msgbox = "Your New Transaction Pin is: " + PIN;
                    GeneralMessageManager.sendMemberMessage(1, msgbox, "New Transaction Pin", UserID);
                    GeneralHistoryManager.LogActivity(UserID, "Transaction PIN", "Changed Transaction PIN", "Changed Transaction PIN");
                    json = new Gson().toJson(result);
                    break;
                }

                case "BusinessRegistration": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String bizindustry = data[1].trim();
                    String biztype = data[2].trim();
                    String bizname = data[3].trim();
                    String bizdfound = data[4].trim();
                    String bizcacnumber = data[5].trim();
                    String bizemail = data[6].trim();
                    String bizphone = data[7].trim();
                    String bizwebadd = data[8].trim();
                    String BizDescription = data[9].trim();

                    int BizIndustryID = Integer.parseInt(bizindustry);
                    int BizTypeID = Integer.parseInt(biztype);
                    Date DateFounded = UtilityManager.getSqlDateFromString(bizdfound);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    String Subclass2 = "Business";
                    String Status = "Activated";
                    int UserID = 0;
                    int BizgroupId = GeneralUserManager.getUserGroupID(Subclass2);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizemail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizphone)) {
                            String OfflineID = GeneralAccountManager.generateRandomNumber(8);
                            UserID = Integer.parseInt(userid);
                            int BizUserID = GeneralUserManager.CreateUser(bizemail, bizphone, "", DateCreated, Status, BizgroupId, DateCreated, OfflineID);
                            if (BizUserID != 0) {
                                 GeneralUserManager.UpdateActivationDate(BizUserID);
                                GeneralUserManager.CreateBusiness(BizUserID, bizname, BizTypeID, DateFounded, bizcacnumber, BizIndustryID, bizwebadd, BizDescription);
                                GeneralUserManager.LinkToUser(UserID, BizUserID, "Member", "Business");
                                String membermsgbdy = "Congratulations!!! You have successfully registered your business of The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(1, membermsgbdy, "Business Created", BizUserID);
                                result = GeneralAccountManager.CreateAccountRecord(BizUserID);
                                String emailmsg = "Congratulations!!! You have successfully your business on The WealthMarket. Welcome to the WealthMarket";
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Activation Code: " + regCode;
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                GeneralHistoryManager.LogActivity(BizUserID, "Registration", "Business Registration", "Registered on The WealthMarket");
                                json = new Gson().toJson(BizUserID);
                            } else {
                                result = "Something went wrong while creating Business Account";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        json = new Gson().toJson(result);
                    }
                    break;
                }
                case "GetMemberDetails": {
                    String userid = request.getParameter("data");
                    int id = Integer.parseInt(userid);
                    HashMap<String, Object> memberdetails = GeneralUserManager.getUserDetails(id);
                    json = new Gson().toJson(memberdetails);
                    break;
                }
                case "GetInspectionFees": {
                    String userid = request.getParameter("data");
                    int id = Integer.parseInt(userid);
                    result = GeneralUserManager.CheckInspectionFees(id);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetPickUpCentres": {
                    ArrayList<Integer> CIDs = GeneralUserManager.getPickUpCentreIds();
                    HashMap<Integer, HashMap<String, String>> CenterList = new HashMap<>();
                    if (!CIDs.isEmpty()) {
                        for (int id : CIDs) {
                            HashMap<String, String> centerdetails = GeneralUserManager.getPickUpCenterDetails(id);
                            CenterList.put(id, centerdetails);
                        }
                        json = new Gson().toJson(CenterList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }

                case "GetBanks": {
                    ArrayList<Integer> BIDs = GeneralUserManager.getBankIds();
                    HashMap<Integer, String> bklist = new HashMap<>();
                    if (!BIDs.isEmpty()) {
                        for (int id : BIDs) {
                            String name = GeneralUserManager.getBankName(id);
                            bklist.put(id, name);
                        }
                        bklist = UtilityManager.SortHashMapIntStringByValues(bklist);
                        json = new Gson().toJson(bklist);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "ResetNewPassword": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    String userpass = data[1];
                    result = GeneralUserManager.UpdatePassword(UserID, userpass);
                    if (result.equals("success")) {
                        GeneralMessageManager.sendMemberMessage(1, "Password reset occurred on your account", "Password Reset", UserID);
//                         String bdy = "New Password: " + userpass;
//                        MessageManager.SendEmail(email, "Password Recovery Code", bdy);
//                        String UserPhoneNumber = DBManager.GetString(Tables.UserTable.PhoneNumber, Tables.UserTable.Table, "where" + Tables.UserTable.ID + " = " + MemberUserID);
//                        SmsManager.SendSMS(regCode, UserPhoneNumber);
                        String email = GeneralUserManager.GetMemberEmail(UserID);
                        String password = GeneralUserManager.GetMemberPassword(UserID);
                        json1 = new Gson().toJson(result);
                        json2 = new Gson().toJson(email);
                        json3 = new Gson().toJson(password);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json1 = new Gson().toJson("failed");
                        json = "[" + json1 + "]";
                    }
                    break;
                }
                case "UpdateUserDetails": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    String NewValue = data[1];
                    String action = data[2];
                    switch (action) {
                        case "Email":
                            result = GeneralUserManager.UpdateEmail(UserID, NewValue);
                            break;
                        case "FirstName":
                            result = GeneralUserManager.UpdateFirstName(UserID, NewValue);
                            break;
                        case "LastName":
                            result = GeneralUserManager.UpdateLastName(UserID, NewValue);
                            break;
                        case "Password":
                            result = GeneralUserManager.UpdatePassword(UserID, NewValue);
                            break;
                        case "Gender":
                            result = GeneralUserManager.UpdateGender(UserID, NewValue);
                            break;
                        case "DateOfBirth":
                            result = GeneralUserManager.UpdateDoB(UserID, NewValue.trim());
                            break;
                        case "DateFound":
                            result = GeneralUserManager.UpdateDateFound(UserID, NewValue.trim());
                            break;
                        case "CACNumber":
                            result = GeneralUserManager.UpdateCACNumber(UserID, NewValue.trim());
                            break;
                        case "WebsiteAddress":
                            result = GeneralUserManager.UpdateWebsiteAddress(UserID, NewValue);
                            break;
                        case "Phone":
                            result = GeneralUserManager.UpdatePhoneNumber(UserID, NewValue.trim());
                            break;
                        case "AccountType":
                            result = GeneralUserManager.UpdateAccountType(UserID, NewValue);
                            break;
                        case "BVNNumber":
                            result = GeneralUserManager.UpdateBVNNumber(UserID, NewValue);
                            break;
                        case "AccountNumber":
                            result = GeneralUserManager.UpdateAccountNumber(UserID, NewValue);
                            break;
                        case "Business Description":
                            result = GeneralUserManager.UpdateDescription(UserID, NewValue);
                            break;
                        case "BankName":
                            result = GeneralUserManager.UpdateBankName(UserID, NewValue);
                            break;
                        default:
                            break;
                    }
                    json1 = new Gson().toJson(result);
                    json2 = new Gson().toJson(action);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "GetMembers": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    ArrayList<Integer> ids = GeneralUserManager.findMember(searchtxt);
                    HashMap<Integer, HashMap<String, Object>> det = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, Object> details = GeneralUserManager.getUserDetails(id);
                            det.put(id, details);
                        }
                        json = new Gson().toJson(det);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "removeUser": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    int ContactID = Integer.parseInt(data[1].trim());
                    String ObjectType1 = data[2].trim();
                    String ObjectType2 = data[3].trim();
                    result = GeneralUserManager.RemoveContact(UserID, ContactID, ObjectType1, ObjectType2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (result.equals("successful")) {
                        String message = name + " has been removed from your list";
//                        HistoryManager.LogActivity(UserID, "Contact", "Remove Contact", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = "Something went wrong! try again Later";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "addUser": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    String Objecttype1 = data[2].trim();
                    String Objecttype2 = data[3].trim();
                    int ContactID = Integer.parseInt(data[1].trim());
                    int linkid = GeneralUserManager.LinkToUser(UserID, ContactID, Objecttype1, Objecttype2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (linkid != 0) {
                        String message = name + " has been added to your list";
//                        HistoryManager.LogActivity(UserID, Object, "Added Contact", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = name + " already exist on your list";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "AddStaff": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    int ContactID = Integer.parseInt(data[1].trim());
                    String Objecttype1 = data[2].trim();
                    String Objecttype2 = data[3].trim();
                    String permids = data[4];
                    String PermIds = permids.replaceAll(":", ",");
                    int linkid = GeneralUserManager.LinkToUser(UserID, ContactID, Objecttype1, Objecttype2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (linkid != 0) {
                        GeneralUserManager.CreateUserGroupStaff(linkid, PermIds);
                        String message = name + " has been added to your list";
//                        HistoryManager.LogActivity(UserID, "Staff", "Added Staff", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = name + " already exist on your list";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "GetBusinessIndustries": {
                    ArrayList<Integer> BIDs = GeneralUserManager.getBusinessIndustryIds();
                    HashMap<Integer, String> contlist = new HashMap<>();
                    if (!BIDs.isEmpty()) {
                        for (int id : BIDs) {
                            String name = GeneralUserManager.GetBusinessIndustryName(id);
                            contlist.put(id, name);
                        }
                        contlist = UtilityManager.SortHashMapIntStringByValues(contlist);
                        json = new Gson().toJson(contlist);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetBusinessTypes": {
                    String industryid = request.getParameter("data");
                    int IndustryID = Integer.parseInt(industryid);
                    ArrayList<Integer> BIDs = GeneralUserManager.getBizTypesIds(IndustryID);
                    HashMap<Integer, String> contlist = new HashMap<>();
                    if (!BIDs.isEmpty()) {
                        for (int id : BIDs) {
                            String name = GeneralUserManager.GetBusinessTypeName(id);
                            contlist.put(id, name);
                        }
                        contlist = UtilityManager.SortHashMapIntStringByValues(contlist);
                        json = new Gson().toJson(contlist);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "SwitchTo": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String bizid = data[1].trim();
                    int UserID = Integer.parseInt(userid);
                    int BizID = Integer.parseInt(bizid);
                    GeneralUserManager.UpdateUserStatus(UserID, "Offline");
                    session.setAttribute("UserOnlineOrOffline", "");
                    GeneralUserManager.UpdateUserTime(UserID);
                    session.removeAttribute("Id");
                    session.removeAttribute("SwitchId");
                    session.removeAttribute("usertype");
                    session.removeAttribute("userName");
                    session.removeAttribute("searchQuery");
                    session.removeAttribute("subclass");

                    GeneralUserManager.UpdateUserStatus(BizID, "Online");
                    session.setAttribute("UserOnlineOrOffline", "Online");
                    session.setAttribute("Id", BizID);
                    session.setAttribute("SwitchId", UserID);
                    String UserName = GeneralUserManager.getUserName(BizID);
                    session.setAttribute("username", UserName);
                    String usertype = GeneralUserManager.GetUserGroupNameByUserID(BizID);
                    session.setAttribute("usertype", usertype);
                    json = new Gson().toJson("success");
                    break;
                }

                case "Populate": {
                    String[] data = request.getParameterValues("data[]");
                    int val = Integer.parseInt(data[0]);
                    String Section = data[1];
                    String value = data[2];
                    HashMap<Integer, String> nameset = GeneralUserManager.GetTableOptions(val, Section);
                    HashMap<String, HashMap<Integer, String>> resend = new HashMap<>();
                    resend.put(value, nameset);
                    json = new Gson().toJson(resend);
                    break;
                }

                case "GetValues": {
                    String[] data = request.getParameterValues("data[]");
                    int val = Integer.parseInt(data[0]);
                    String section = data[1];
                    String Case = data[2];
                    int value = GeneralUserManager.GetValue(Case, section, val);
                    json = new Gson().toJson(value);
                    break;
                }
                case "InsertSection": {
                    int value;
                    String[] data = request.getParameterValues("data[]");
                    String Section = data[0];
                    String AdditionName = data[1];
                    String[] resend = new String[3];
                    value = GeneralUserManager.InsertNewSection(AdditionName, Section, data);
                    resend[0] = Section;
                    resend[1] = AdditionName;
                    resend[2] = "" + value;
                    json = new Gson().toJson(resend);
                    break;
                }
                case "RequestChangeDetails": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    String changeSubject = (data[1]);
                    String oldDetail = (data[2]);
                    String newDetail = (data[3]);
                    result = GeneralUserManager.ChangeDetails(UserID, changeSubject, oldDetail, newDetail);
                    json = new Gson().toJson(result);
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
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
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
