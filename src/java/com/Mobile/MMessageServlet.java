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
import wmengine.Managers.GeneralMessageManager;

/**
 *
 * @author Saint
 */
public class MMessageServlet extends HttpServlet {

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
            throws ServletException, IOException {
        try {
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
            switch (type) {
                case "Message": {
                    String memberid = (String) jsonParameter.get("memberid");
                    int mid = Integer.parseInt(memberid);
                    ArrayList<Integer> list = new ArrayList<>();
                    String option = (String) jsonParameter.get("option");
                    HashMap<String, String> msgdetails = new HashMap<>();
                    if (option.equals("inbox")) {
                        list = GeneralMessageManager.getInboxMessageIDs(mid);
                    } else if (option.equals("sent")) {
                        list = GeneralMessageManager.getSentMessageIDs(mid);
                    }
                    ArrayList<HashMap<String, String>> msglist = new ArrayList<>();
                    if (!list.isEmpty()) {
                        for (int id : list) {
                            msgdetails = GeneralMessageManager.GetMessageDetails(id);
                            msglist.add(msgdetails);
                        }
                        String code = "200";
                        String json1 = new Gson().toJson(code);
                        String json2 = new Gson().toJson(msglist);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        String code = "400";
                        String json1 = new Gson().toJson(code);
                        String message = "Sorry no message(s)";
                        String json2 = new Gson().toJson(message);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }
                case "Delete Message": {
                    String messageid = (String) jsonParameter.get("messageid");
                    int msgid = Integer.parseInt(messageid);
                    String res = GeneralMessageManager.DeleteMessage(msgid);
                    if (res.equals("failed")) {
                        String message = "Something went wrong! try again Later";
                        json = new Gson().toJson(message);
                    } else {
                        String message = "Message Deleted";
                        json = new Gson().toJson(message);

                    }
                    break;
                }
                case "MarkAsRead": {
                    String messageid = (String) jsonParameter.get("messageid");
                    int msgid = Integer.parseInt(messageid);
                    String res = GeneralMessageManager.MarkAsRead(msgid);
                    if (res.equals("failed")) {
                        String message = "Something went wrong! try again Later";
                        json = new Gson().toJson(message);
                    } else {
                        String message = "Message Read";
                        json = new Gson().toJson(message);

                    }
                    break;
                }
                case "MessageDetails": {
                    String messageid = (String) jsonParameter.get("messageid");
                    int MsgID = Integer.parseInt(messageid);
                    HashMap<String, String> det = GeneralMessageManager.GetMessageDetails(MsgID);
                    if (!det.isEmpty()) {
                        json = new Gson().toJson(det);
                    } else {
                        String message = "Something went wrong! try again Later";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "SendMessage": {
                    String memberid = (String) jsonParameter.get("memberid");
                    int memid = Integer.parseInt(memberid);

                    String sContactID = (String) jsonParameter.get("selectedContactID");
                    int benid = Integer.parseInt(sContactID);

                    String title = (String) jsonParameter.get("msgTitle");
                    String bdy = (String) jsonParameter.get("msgBody");
                    if (bdy != null && bdy != "") {
                        GeneralMessageManager.sendMemberMessage(memid, bdy, title, benid);
                        String message = "Message Sent";
                        json = new Gson().toJson(message);
                    } else {
                        String message = "Populate Empty Fields";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
            }
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(MMessageServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(MMessageServlet.class.getName()).log(Level.SEVERE, null, ex);
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
