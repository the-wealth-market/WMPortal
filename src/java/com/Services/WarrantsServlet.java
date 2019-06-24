/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
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
import wmengine.Managers.DBManager;
import wmengine.Managers.*;
import wmengine.Tables.Tables;

/**
 *
 * @author Stephen
 */
public class WarrantsServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException, UnsupportedEncodingException, ParseException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String type = request.getParameter("type");
            String json = "";
            String empty = "none";
            switch (type) {
                case "ListValueForSale": {
                    String[] data = request.getParameterValues("data[]");
                    String offers = data[0].trim();
                    String requests = data[1].trim();
                    int userid = Integer.parseInt("" + session.getAttribute("Id"));
                    String result = GeneralWarrantsMarketManager.ListOffer(userid, offers, requests);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetLiveListings": {
                    String data = request.getParameter("data");
                    HashMap<Integer, HashMap<String, String>> listings = new HashMap<>();
                    ArrayList<Integer> listingIDs = new ArrayList<>();
                    int userid = Integer.parseInt("" + session.getAttribute("Id"));
                    if (data.equals("All")) {
                        listingIDs = GeneralWarrantsMarketManager.GetLiveListings();
                    } else {
                        listingIDs = GeneralWarrantsMarketManager.GetUserLiveListings(userid);
                    }
                    if (!listingIDs.isEmpty()) {
                        for (int id : listingIDs) {
                            HashMap<String, String> det = GeneralWarrantsMarketManager.GetListingDetails(id); 
                            if (!det.isEmpty()) {
                                userid = Integer.parseInt(det.get(Tables.WarrantsMarketListings.UserID));
                                String fullname = GeneralUserManager.getUserName(userid);
                                det.put("fullname", fullname);
                                 det.put("usertype", "Member");
                                listings.put(id, det);
                            }
                        }
                        String json1 = new Gson().toJson(listingIDs);
                        String json2 = new Gson().toJson(listings);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetLiveOffers": {
                    String data = request.getParameter("data");
                    HashMap<Integer, HashMap<String, String>> listings = new HashMap<>();
                    ArrayList<Integer> listingIDs = new ArrayList<>();
                    int userid = Integer.parseInt("" + session.getAttribute("Id"));
                    if (data.equals("All")) {
                        listingIDs = GeneralWarrantsMarketManager.GetLiveListings();
                    } else {
                        listingIDs = GeneralWarrantsMarketManager.GetUserLiveListings(userid);
                    }
                    if (!listingIDs.isEmpty()) {
                        for (int id : listingIDs) {
                            HashMap<String, String> det = GeneralWarrantsMarketManager.GetListingDetails(id); 
                            if (!det.isEmpty()) {
                                userid = Integer.parseInt(det.get(Tables.WarrantsMarketListings.UserID));
                                String fullname = GeneralUserManager.getUserName(userid);
                                det.put("fullname", fullname);
                                 det.put("usertype", "Member");
                                listings.put(id, det);
                            }
                        }
                        String json1 = new Gson().toJson(listingIDs);
                        String json2 = new Gson().toJson(listings);
                        json = "[" + json1 + "," + json2 + "]";
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
            throws ServletException, IOException, UnsupportedEncodingException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException | SQLException | ParseException ex) {
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
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
        } catch (ClassNotFoundException | SQLException | ParseException ex) {
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
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
