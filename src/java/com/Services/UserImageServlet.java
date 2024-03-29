/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import wmengine.Managers.FilePathManager;
import javax.servlet.http.Part;

/**
 *
 * @author Saint
 */
@WebServlet(name = "UserImageServlet", urlPatterns = {"/UserImageServlet"})
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
        maxFileSize = 1024 * 1024 * 10, // 10MB
        maxRequestSize = 1024 * 1024 * 50)   // 50MB
public class UserImageServlet extends HttpServlet {

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
            String portaladdress = FilePathManager.getInstance().getPortalProfilePictureAddress();
            String shopaddress = FilePathManager.getInstance().getShopProfilePictureAddress();
            String manageraddress = FilePathManager.getInstance().getManagerProfilePictureAddress();
            // creates the save directory if it does not exists
            for (Part part : request.getParts()) {
                String fileName = extractFileName(part);
                if (!fileName.equals("")) {
                    String userid = request.getParameter("loggedinuserid");
                    int UserID = Integer.parseInt(userid);
                    //fileName = new File(fileName).getName();
                    fileName = "user-" + UserID + ".png";
                    // Delete filename if it exists 
                    FilePathManager.getInstance().deleteProfilePictureFile(fileName, portaladdress);
                    FilePathManager.getInstance().deleteProfilePictureFile(fileName, shopaddress);
                    FilePathManager.getInstance().deleteProfilePictureFile(fileName, manageraddress);
                    // refines the fileName

                    try {
                        part.write(portaladdress + File.separator + fileName);
                        part.write(shopaddress + File.separator + fileName);
                        part.write(manageraddress + File.separator + fileName);
//                        FilePathManager.getInstance().msgbox("image added successfully");
                    } catch (Exception ex) {
                        String problem = ex.getMessage();
                        System.out.print(problem);
//                        FilePathManager.getInstance().msgbox("problem" + "" + problem);
                    }
                }
            }
            response.sendRedirect(request.getHeader("referer"));
        }
    }

    private String extractFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length() - 1);
            }
        }
        return "";
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
        processRequest(request, response);
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
