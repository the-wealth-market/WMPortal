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
import wmengine.Managers.*;

/**
 *
 * @author Stephen
 */
public class CategoryServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException, UnsupportedEncodingException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String json = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            switch (type) {
                case "GetTopCategories": {
                    ArrayList<Integer> TopCatIds = GeneralProductManager.GetAllTopCatategoryIDs();
                    HashMap<Integer, String> data = new HashMap<>();
                    if (!TopCatIds.isEmpty()) {
                        for (int catid : TopCatIds) {
                            String catName = GeneralCategoryManager.GetCategoryName(catid);
                            data.put(catid, catName);
                        }
                        json = new Gson().toJson(data);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetCategories": {
                    String cid = request.getParameter("data");
                    int catId = Integer.parseInt(cid);
                    ArrayList<Integer> CatIds = GeneralProductManager.getTopCategoryWithoutLimit(catId);
                    HashMap<Integer, String> List = new HashMap<>();
                    if (!CatIds.isEmpty()) {
                        for (int catid : CatIds) {
                            String catName = GeneralCategoryManager.GetCategoryName(catid);
                            List.put(catid, catName);
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetSubCategories": {
                    String catid = request.getParameter("data");
                    int catId = Integer.parseInt(catid);
                    ArrayList<Integer> SubCatIds = GeneralProductManager.getCat_SubCatIDsWithoutLimit(catId);
                    HashMap<Integer, String> list = new HashMap<>();
                    if (!SubCatIds.isEmpty()) {
                        for (int subcatid : SubCatIds) {
                            String SubCatName = GeneralCategoryManager.GetCategoryName(subcatid);
                            list.put(subcatid, SubCatName);
                        }
                        json = new Gson().toJson(list);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetAllCategories": {
                    HashMap<Integer, String> CategoryNameList = GeneralCategoryManager.GetAllCategoriesIdName();
                    if (!CategoryNameList.isEmpty()) {
                        json = new Gson().toJson(CategoryNameList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetCategoryProperties": {
                    String catid = request.getParameter("data");
                    int catId = Integer.parseInt(catid);
                    HashMap<String, String> List = new HashMap<>();
                    ArrayList<String> catProps = GeneralCategoryManager.GetCategoryProperties(catId);
                    if (!catProps.isEmpty()) {
                        for (String propid : catProps) {
                            int pid = Integer.parseInt(propid);
                            String catName = GeneralCategoryManager.GetCategoryPropertyName(pid);
                            List.put(propid, catName);
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                
                case "GetCategoryVariants": {
                String catid = request.getParameter("data");
                int catId = Integer.parseInt(catid);
                HashMap<Integer, HashMap<String, String>> List = new HashMap<>();
                ArrayList<String> catProps = GeneralCategoryManager.GetCategoryProperties(catId);
                if (!catProps.isEmpty()) {
                    for (String propid : catProps) {
                        int pid = Integer.parseInt(propid);
                        HashMap<String, String> catPropDetails = GeneralCategoryManager.GetCategoryVariants(pid);
                        List.put(pid, catPropDetails);
                    }
                    json = new Gson().toJson(List);
                } else {
                    json = new Gson().toJson(empty);
                }
                break;
            }
            }

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (ParseException ex) {
            Logger.getLogger(CategoryServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(CategoryServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CategoryServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(CategoryServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CategoryServlet.class.getName()).log(Level.SEVERE, null, ex);
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
