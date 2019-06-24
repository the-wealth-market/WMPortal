/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Managers;

import com.twilio.sdk.TwilioRestException;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.ParseException;
import static wmengine.Managers.SMSManager.sendSMS;
import wmengine.Managers.*;

/**
 *
 * @author ndfmac
 */
public class SMSManager {

    public SMSManager() {

    }

    public static String SmsTransfer(int FromUserID, int AccountDefID, String beneficiary, int Amount, int transpin) throws ClassNotFoundException, SQLException, ParseException, UnsupportedEncodingException, TwilioRestException {
        String message = "";
        String senderName = "";
        String receiverName = "";

        int tpin = GeneralAccountManager.GetUserTransactionPIN(FromUserID);
        if (tpin == transpin) {
            int ToUserID = checkBeneficiary(beneficiary);
            if (ToUserID == 0) {
                message = "Beneficiary doesn't exist on the WealthMarket " + beneficiary;
            } else {
                senderName = GeneralUserManager.getUserName(FromUserID);
                receiverName = GeneralUserManager.getUserName(ToUserID);
                String bdy = senderName + " has just transferred =N" + Amount + " to your account.";
                String bdy2 = "You transfered =N" + Amount + " to " + receiverName + " account";
                String Comment = "Transfer of N" + Amount + " From " + senderName + " to " + receiverName;
                String TransactionName = "Transfers";
                int chargesAmount = GeneralAccountManager.GetTransactionTypeChargesAmount(TransactionName);
                String result = GeneralAccountManager.Transfer(FromUserID, ToUserID, AccountDefID, 1, 1, Amount, "To-Online", Comment, TransactionName, chargesAmount);
                if (result.equals("success")) {
                    String ToUserPhone_number = GeneralUserManager.getUserPhone(ToUserID);
                    sendSMS(bdy, ToUserPhone_number);
                    String FromUserphone_number = GeneralUserManager.getUserPhone(FromUserID);
                    sendSMS(bdy2, FromUserphone_number);
                    message = "Transaction was Successful! You made a transfer of " + Amount + " to " + receiverName + " account";
                } else {
                    message = "Something went wrong! try again later";
                }
            }
        } else {
            message = "Sorry! Your transaction PIN is incorrect";
        }
        return message;
    }

    public static int checkBeneficiary(String beneficiary) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        int benid = 0;

        benid = GeneralUserManager.checkVerifyingEmail(beneficiary);
        if (benid == 0) {
            benid = GeneralUserManager.checkVerifyingPhone(beneficiary);
            if (benid == 0) {
                benid = GeneralAccountManager.GetUserIDByAccountNumber(beneficiary);
            } else {
                return benid;
            }
        } else {
            return benid;
        }

        return benid;
    }

    public static String SmsRegister(String emailaddress, String firstname, String password, String PhoneNumber, String lastname) throws ClassNotFoundException, SQLException, ParseException, UnsupportedEncodingException, TwilioRestException {
        String message = "";
        java.sql.Date DateCreated = UtilityManager.CurrentDate();
        java.sql.Date DateOfBirth = UtilityManager.CurrentDate();
        String Subclass = "Member";
        String Status = "Not Activated";
        int MemberUserID = 0;
        int UsergroupId = GeneralUserManager.getUserGroupID(Subclass);
        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(emailaddress)) {
            if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(PhoneNumber)) {
                String OfflineID = GeneralAccountManager.generateRandomNumber(6);
                MemberUserID = GeneralUserManager.CreateUser(emailaddress, PhoneNumber, password, DateCreated, Status, UsergroupId, DateCreated, OfflineID);
                if (MemberUserID != 0) {
                    GeneralUserManager.CreateMember(firstname, lastname, DateOfBirth, "Null", MemberUserID);
                    String membermsgbdy = "Congratulations!!! You have been successfully registered as a member of The WealthMarket.";
                    GeneralMessageManager.sendMemberMessage(1, membermsgbdy, "Member Created", MemberUserID);
                    message = GeneralAccountManager.CreateAccountRecord(MemberUserID);
                    String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Welcome to the WealthMarket";
                    sendSMS(emailmsg, PhoneNumber);
//                    MessageManager.SendSimpleMessage(emailaddress, "Welcome to The WealthMarket", emailmsg);
                    GeneralHistoryManager.LogActivity(MemberUserID, "Registration", "Member Registration", "Registered on The WealthMarket");

                } else {
                    message = "Something went wrong while creating User Account";
                }
            } else {
                message = "Account with Phone Number already Exists";

            }
        } else {
            message = "Account with Email Address already Exists";
        }

        return message;
    }

}
