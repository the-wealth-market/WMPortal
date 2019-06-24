/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;


import com.Managers.SMSManager;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.verbs.Message;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import wmengine.Managers.*;
import static wmengine.Managers.SMSManager.sendSMS;

/**
 *
 * @author ndfmac
 */
public class SMSServlet extends HttpServlet {

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
            throws ServletException, IOException, TwilioRestException, ClassNotFoundException, SQLException, ParseException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            Message message = null;
            String msg = "";
            String fromNumber = request.getParameter("From");
            String messageBody = request.getParameter("Body");

            String words[] = messageBody.split(" ");
            String action = words[0];
            int userID = GeneralUserManager.getUserIDByPhoneNumber(fromNumber);
            if (userID != 0) {
                String UserName = GeneralUserManager.getUserName(userID);
                if (action.equalsIgnoreCase("pay")) {
                    String beneficiary = words[1];
                    String amount = words[2];
                    String pin = words[3];
                    int transpin = Integer.parseInt(pin);
                    int amt = Integer.parseInt(amount);
                    int AcctDef = 1;
                    if (!beneficiary.equals("null") || !amount.equals("null") || !pin.equals("null")) {
                        msg = SMSManager.SmsTransfer(userID, AcctDef, beneficiary, amt, transpin);
                        sendSMS(msg, fromNumber);
                        message = new Message(msg);
                    } else {
                        msg = "Incorrect Application. Please input the correct parameters 'pay beneficiary amount pin' (e.g pay someone@example.com 1000 1234)";
                        sendSMS(msg, fromNumber);
                        message = new Message(msg);
                    }
                } else if (action.equalsIgnoreCase("reg")) {
                    msg = "This number is already registered on The WealthMarket";
                    sendSMS(msg, fromNumber);
                    message = new Message(msg);
                } else if (action.equalsIgnoreCase("bal")) {
                    String accountType = words[1];
                    String pin = words[2];
                    int TPin = Integer.parseInt(pin);
                    int bal = 0;
                    int TransPin = GeneralAccountManager.GetUserTransactionPIN(userID);
                    if (TPin == TransPin) {
                        if (accountType.equalsIgnoreCase("w")) {
                            bal = GeneralAccountManager.GetUserAvailableBalance(userID, 1);
                            msg = UserName + ", your Warrants Account Balance is N" + bal;
                            sendSMS(msg, fromNumber);
                            message = new Message(msg);
                        } else if (accountType.equalsIgnoreCase("r")) {
                            bal = GeneralAccountManager.GetUserAvailableBalance(userID, 2);
                            msg = UserName + ", your Reflation Rights Account Balance is N" + bal;
                            sendSMS(msg, fromNumber);
                            message = new Message(msg);
                        } else if (accountType.equalsIgnoreCase("p")) {
                            bal = GeneralAccountManager.GetUserAvailableBalance(userID, 3);
                            msg = UserName + ", your Par Casing Rights Account Balance is N" + bal;
                            sendSMS(msg, fromNumber);
                            message = new Message(msg);
                        } else {
                            msg = "Incorrect parameters. Please input the correct parameters 'bal accounttype pin' (e.g bal w/r/p 1234)";
                            sendSMS(msg, fromNumber);
                            message = new Message(msg);
                        }

                    } else {
                        msg = UserName + ", Sorry! Your transaction PIN is incorrect";
                        sendSMS(msg, fromNumber);
                        message = new Message("" + bal);
                    }
                } else {
                    msg = UserName + ", Incorrect Command";
                    sendSMS(msg, fromNumber);
                    message = new Message(msg);
                }
            } else {
                if (action.equalsIgnoreCase("reg")) {
                    String email = words[1];
                    String firstName = words[2];
                    String lastName = words[3];
                    String password = words[4];
                    if (!email.equals("null") || !firstName.equals("null") || !lastName.equals("null")) {
                        msg = SMSManager.SmsRegister(email, firstName, password, fromNumber, lastName);
                        if (msg.equals("success")) {
                            msg = "Welcome to the Wealthmarket. Go to www.thewealthmarket.com to complete your registration process with the Wealthmarket.";
                            sendSMS(msg, fromNumber);
                            message = new Message(msg);
                        }
                        sendSMS(msg, fromNumber);
                        message = new Message(msg);
                    } else {
                        msg = "Incomplete Application. Please input the correct parameters 'reg email firstname lastname password' (e.g reg someone@example.com saint stephen kole0000) to +12672024951";
                        sendSMS(msg, fromNumber);
                        message = new Message(msg);
                    }
                } else {
                    msg = "Account with Phone Number already Exists on the WealthMarket. to register, text (e.g reg email firstname lastname password) to +12672024951";
                    sendSMS(msg, fromNumber);
                    message = new Message(msg);
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
        } catch (TwilioRestException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
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
        } catch (TwilioRestException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(SMSServlet.class.getName()).log(Level.SEVERE, null, ex);
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
