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
 * @author Stephen
 */
public class FavoritesServlet extends HttpServlet {

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
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String json = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            String result = "";
            switch (type) {
                case "GetUserFavorites": {
                    String[] data = request.getParameterValues("data[]");
                    String userID = data[0].trim();
                    String objecttype1 = data[1].trim();
                    String objecttype2 = data[2].trim();
                    int userid = Integer.parseInt(userID);
                    ArrayList<Integer> favids = GeneralUserManager.getUserFavorites(userid, objecttype1, objecttype2);
                    HashMap<Integer, HashMap<String, String>> favdetails = new HashMap<>();
                    if (!favids.isEmpty()) {
                        for (int fav : favids) {
                            HashMap<String, String> FavDet = GeneralObjectManager.getObjectDetails(fav, objecttype2);
                            favdetails.put(fav, FavDet);
                        }
                        json = new Gson().toJson(favdetails);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetUserHistory": {
                    String userID = request.getParameter("data");
                    int userid = Integer.parseInt(userID);
                    ArrayList<Integer> ids = GeneralHistoryManager.getUserHistoryWithLimit(userid, 0, 10);
                    HashMap<Integer, HashMap<String, String>> details = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> det = GeneralObjectManager.getObjectDetails(id, "History");
                            details.put(id, det);
                        }
                        json = new Gson().toJson(details);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "GetUserDashboardActivities": {
                    String[] data = request.getParameterValues("data[]");
                    String userID = data[0].trim();
                    int userid = Integer.parseInt(userID);
                    ArrayList<Integer> ids = GeneralHistoryManager.getUserHistoryWithLimit(userid, 0, 5);
                    HashMap<Integer, HashMap<String, String>> details = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> det = GeneralObjectManager.getObjectDetails(id, "History");
                            details.put(id, det);
                        }
                        json = new Gson().toJson(details);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "LogActivities": {
                    String[] data = request.getParameterValues("data[]");
                    String userID = data[0].trim();
                    String Category = data[1].trim();
                    String Topic = data[2].trim();
                    String Details = data[3].trim();
                    int userid = Integer.parseInt(userID);
                    result = GeneralHistoryManager.LogActivity(userid, Category, Topic, Details);
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
        } catch (ClassNotFoundException | SQLException | ParseException ex) {
            Logger.getLogger(FavoritesServlet.class.getName()).log(Level.SEVERE, null, ex);
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
        } catch (ClassNotFoundException | SQLException | ParseException ex) {
            Logger.getLogger(FavoritesServlet.class.getName()).log(Level.SEVERE, null, ex);
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
