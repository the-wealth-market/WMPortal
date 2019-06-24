/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Models;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.GeneralUserManager;

/**
 *
 * @author Saint
 */
@WebServlet(name = "LinksServlet", urlPatterns = {"/LinksServlet"})
public class LinksServlet extends HttpServlet {

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
            String type = request.getParameter("type");
            switch (type) {
                case "Login": {
//                    response.sendRedirect("pages/general/login.jsp");
                    response.sendRedirect("index.jsp");
                    break;
                }
                case "Register": {
                    response.sendRedirect("pages/general/register.jsp");
                    break;
                }
                case "Offline": {
                    response.sendRedirect("pages/general/offline.jsp");
                    break;
                }
                case "Terms": {
                    response.sendRedirect("pages/general/terms.jsp");
                    break;
                }
                case "Reset": {
                    response.sendRedirect("pages/general/resetPassword.jsp");
                    break;
                }
                case "Validate": {
                    response.sendRedirect("pages/general/validate.jsp");
                    break;
                }
                case "Dashboard": {
                    response.sendRedirect("pages/users/dashboard/dashboard.jsp");
                    break;
                }
                case "Messages": {
                    response.sendRedirect("pages/users/messages/messages.jsp");
                    break;
                }
                case "Compose": {
                    response.sendRedirect("pages/users/messages/compose.jsp");
                    break;
                }
                case "Sent": {
                    response.sendRedirect("pages/users/messages/sent.jsp");
                    break;
                }
                case "Trash": {
                    response.sendRedirect("pages/users/messages/trash.jsp");
                    break;
                }
                case "Business": {
                    response.sendRedirect("pages/users/business/business.jsp");
                    break;
                }
                case "Profile": {
                    response.sendRedirect("pages/users/profile/profile.jsp");
                    break;
                }
                case "Contacts": {
                    response.sendRedirect("pages/users/profile/contacts.jsp");
                    break;
                }
                case "Staff": {
                    response.sendRedirect("pages/users/profile/staff.jsp");
                    break;
                }
                case "Favorites": {
                    response.sendRedirect("pages/users/profile/favorites.jsp");
                    break;
                }
                case "History": {
                    response.sendRedirect("pages/users/profile/history.jsp");
                    break;
                }
                case "Products": {
                    response.sendRedirect("pages/users/profile/products.jsp");
                    break;
                }
                case "Products_Listing": {
                    response.sendRedirect("pages/users/profile/product_listing.jsp");
                    break;
                }
                case "Permissions": {
                    response.sendRedirect("pages/users/profile/permissions.jsp");
                    break;
                }
                case "Services": {
                    response.sendRedirect("pages/users/profile/services.jsp");
                    break;
                }
                case "WarrantsMarket": {
                    response.sendRedirect("pages/users/warrantsMarket/warrantsMarket.jsp");
                    break;
                }
                case "MyBids": {
                    response.sendRedirect("pages/users/warrantsMarket/mybids.jsp");
                    break;
                }
                case "MyListings": {
                    response.sendRedirect("pages/users/warrantsMarket/mylistings.jsp");
                    break;
                }
                case "Accounts": {
                    response.sendRedirect("pages/users/accounts/accounts.jsp");
                    break;
                }
                case "Reflation": {
                    response.sendRedirect("pages/users/accounts/reflation.jsp");
                    break;
                }
                case "ParCash": {
                    response.sendRedirect("pages/users/accounts/parcash.jsp");
                    break;
                }
                case "Semple": {
                    response.sendRedirect("pages/users/schemes/semple.jsp");
                    break;
                }
                case "UPPEP": {
                    response.sendRedirect("pages/users/schemes/uppep.jsp");
                    break;
                }
                case "MANSAR": {
                    response.sendRedirect("pages/users/schemes/mansar.jsp");
                    break;
                }
                case "Mobilisation": {
                    response.sendRedirect("pages/users/schemes/mobilisation.jsp");
                    break;
                }
                case "Commoditisation": {
                    response.sendRedirect("pages/users/schemes/commoditisation.jsp");
                    break;
                }
                case "Monetisation": {
                    response.sendRedirect("pages/users/schemes/monetisation.jsp");
                    break;
                }
                case "MonetisationApplication": {
                    response.sendRedirect("pages/users/schemes/monetisation_application.jsp");
                    break;
                }
                case "Search": {
                    session.setAttribute("categoryID", request.getParameter("cat"));
                    session.setAttribute("query", request.getParameter("query"));
                    response.sendRedirect("pages/products/products.jsp");
                    break;
                }
                case "ManageBusinessStaffPermission": {
                    session.setAttribute("StaffUserID", request.getParameter("StaffUserID"));
                    session.setAttribute("StaffUserName", request.getParameter("StaffUserName"));
                    response.sendRedirect("pages/users/business/business_staff_perms.jsp");
                    break;
                }
                case "LogOut": {
                    session.removeAttribute("Id");
                    session.removeAttribute("UserType");
                    session.removeAttribute("userName");
                    session.removeAttribute("subclass");
                    response.sendRedirect("index.jsp");
                    break;
                }
                case "Index": {
                    int UserID = Integer.parseInt("" + session.getAttribute("Id"));
                    GeneralUserManager.UpdateUserStatus(UserID, "Offline");
                    session.setAttribute("UserOnlineOrOffline", "");
                    GeneralUserManager.UpdateUserTime(UserID);
                    session.removeAttribute("Id");
                    session.removeAttribute("UserType");
                    session.removeAttribute("userName");
                    session.removeAttribute("subclass");
                    response.sendRedirect("index.jsp");
                    break;
                }
                default: {
                    response.sendRedirect(request.getHeader("referer"));
                }
            }
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
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
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
