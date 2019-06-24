/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
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
public class MessageServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String json = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            switch (type) {
                case "GetUserMessages": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String option = data[1].trim();
                    int userId = Integer.parseInt(userid);
                    ArrayList<Integer> IDS = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> MessageList = new HashMap<>();
                    String mtype = "";
                    if (option.equals("inbox")) {
                        mtype = "inbox";
                        IDS = GeneralMessageManager.getInboxMessageIDs(userId);
                    } else if (option.equals("sent")) {
                        mtype = "sent";
                        IDS = GeneralMessageManager.getSentMessageIDs(userId);
                    } else if (option.equals("trash")) {
                        mtype = "trash";
                        IDS = GeneralMessageManager.getTrashMessageIDs(userId);
                    }
                    if (!IDS.isEmpty()) {
                        for (int id : IDS) {
                            HashMap<String, String> msgdetails = GeneralMessageManager.GetMessageDetails(id);
                            MessageList.put(id, msgdetails);
                        }
                        json1 = new Gson().toJson(IDS);
                        json2 = new Gson().toJson(MessageList);
                        json3 = new Gson().toJson(mtype);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetUserUnreadMessages": {
                    String userid = request.getParameter("data");
                    int userId = Integer.parseInt(userid);
                    ArrayList<Integer> ids = new ArrayList<>();
                    ids = GeneralMessageManager.getUnreadMessageIDs(userId, 0, 5);
                    ArrayList<Integer> count = GeneralMessageManager.getUnreadMessageCount(userId);
                    HashMap<Integer, HashMap<String, String>> MessageList = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> msgdetails = GeneralMessageManager.GetMessageDetails(id);
                            MessageList.put(id, msgdetails);
                        }
                        json1 = new Gson().toJson(ids);
                        json2 = new Gson().toJson(MessageList);
                        json3 = new Gson().toJson(count.size());
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetUserMessageCounts": {
                    String userid = request.getParameter("data");
                    int userId = Integer.parseInt(userid);
                    ArrayList<Integer> IIDS = new ArrayList<>();
                    ArrayList<Integer> SIDS = new ArrayList<>();
                    IIDS = GeneralMessageManager.getInboxMessageIDs(userId);
                    SIDS = GeneralMessageManager.getSentMessageIDs(userId);
                    ArrayList<Integer> TIDS = GeneralMessageManager.getTrashMessageIDs(userId);
                    json1 = new Gson().toJson(IIDS.size());
                    json2 = new Gson().toJson(SIDS.size());
                    json3 = new Gson().toJson(TIDS.size());
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GetMessageDetails": {
                    int messageid = Integer.parseInt(request.getParameter("data"));
                    HashMap<String, String> msgdetails = GeneralMessageManager.GetMessageDetails(messageid);
                    json = new Gson().toJson(msgdetails);
                    break;
                }
                case "NewMessage": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String contactid = data[1].trim();
                    String subject = data[2].trim();
                    String body = data[3].trim();
                    int userId = Integer.parseInt(userid);
                    int contactId = Integer.parseInt(contactid);
                    String result = GeneralMessageManager.sendMemberMessage(userId, body, subject, contactId);
                    json = new Gson().toJson(result);
                    break;
                }
                case "MarkAsRead": {
                    String params = request.getParameter("data");
                    int msgid = Integer.parseInt(params);
                    String res = GeneralMessageManager.MarkAsRead(msgid);
                    json = new Gson().toJson(res);
                    break;
                }
                case "TrashMessage": {
                    String[] data = request.getParameterValues("data[]");
                    String msgid = data[0].trim();
                    String mtype = data[1].trim();
                    int msgID = Integer.parseInt(msgid);
                    String result = "";
                    if (mtype.equals("trash")) {
                        result = GeneralMessageManager.DeleteMessage(msgID);
                    } else {
                        result = GeneralMessageManager.TrashMessage(msgID);
                    }
                    json1 = new Gson().toJson(result);
                    json2 = new Gson().toJson(mtype);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "RecoverMessage": {
                    String[] data = request.getParameterValues("data[]");
                    String messageid = data[0].trim();
                    String mtype = data[1].trim();
                    int messaID = Integer.parseInt(messageid);
                    String result = "";
                    if (mtype.equals("trash")) {
                        result = GeneralMessageManager.RecoverMessage(messaID);
                    } else {
                    }
                    json1 = new Gson().toJson(result);
                    json2 = new Gson().toJson(mtype);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "GetSearchUserDetails": {
                    String UserInput = request.getParameter("data");
                    HashMap<String, String> details = GeneralAccountManager.getSearchResult(UserInput, 0);
                    json = new Gson().toJson(details);
                    break;
                }
                case "GetSearchMessageDetails": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    ArrayList<Integer> ids = GeneralMessageManager.getSearchedMessageIDs(searchtxt);
                    HashMap<Integer, HashMap<String, String>> det = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> details = GeneralMessageManager.GetMessageDetails(id);
                            det.put(id, details);
                        }
                        json1 = new Gson().toJson(ids);
                        json2 = new Gson().toJson(det);
                        json3 = new Gson().toJson("inbox");
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
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
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(MessageServlet.class.getName()).log(Level.SEVERE, null, ex);
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
