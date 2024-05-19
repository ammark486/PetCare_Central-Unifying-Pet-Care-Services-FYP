package com.example.demo.template;


import com.example.demo.dto.ProductTemplateDto;

import java.util.List;

public class EmailTemplate {


    private static String APPOINTMENT_TEMPLATE = "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "<title></title>\n" +
            "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
            "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
            "<style type=\"text/css\">\n" +
            "\n" +
            "body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\n" +
            "table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\n" +
            "img { -ms-interpolation-mode: bicubic; }\n" +
            "\n" +
            "img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }\n" +
            "table { border-collapse: collapse !important; }\n" +
            "body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }\n" +
            "\n" +
            "\n" +
            "a[x-apple-data-detectors] {\n" +
            "    color: inherit !important;\n" +
            "    text-decoration: none !important;\n" +
            "    font-size: inherit !important;\n" +
            "    font-family: inherit !important;\n" +
            "    font-weight: inherit !important;\n" +
            "    line-height: inherit !important;\n" +
            "}\n" +
            "\n" +
            "@media screen and (max-width: 480px) {\n" +
            "    .mobile-hide {\n" +
            "        display: none !important;\n" +
            "    }\n" +
            "    .mobile-center {\n" +
            "        text-align: center !important;\n" +
            "    }\n" +
            "}\n" +
            "div[style*=\"margin: 16px 0;\"] { margin: 0 !important; }\n" +
            "</style>\n" +
            "<body style=\"margin: 0 !important; padding: 0 !important; background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\n" +
            "\n" +
            "\n" +
            "<div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\">\n" +
            "For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. \n" +
            "</div>\n" +
            "\n" +
            "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
            "    <tr>\n" +
            "        <td align=\"center\" style=\"background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\n" +
            "        \n" +
            "        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\n" +
            "            <tr>\n" +
            "                <td style=\"background-color: white !important;\" align=\"center\" valign=\"top\" style=\"font-size:0; padding: 35px;\" bgcolor=\"#F44336\">\n" +
            "               \n" +
            "                <div style=\"display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;\">\n" +
            "                    <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\n" +
            "                        <tr>\n" +
            "                            <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;\" class=\"mobile-center\">\n" +
            "                              <img style=\"margin-top: 10%;\" src=\"https://storage.googleapis.com/fastlearner-bucket/PREVIEW_THUMBNAIL/srtQ8Zga_logo.png\" alt=\"\">\n" +
            "                            </td>\n" +
            "                        </tr>\n" +
            "                    </table>\n" +
            "                </div>\n" +
            "                \n" +
            "              \n" +
            "                </td>\n" +
            "            </tr>\n" +
            "            <tr>\n" +
            "                <td align=\"center\" style=\"padding: 35px 35px 20px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\n" +
            "                {{CONTENT_PLACEHOLDER}}\n" +
            "                </td>\n"+
            "        </table>\n" +
            "        </td>\n" +
            "    </tr>\n" +
            "</table>\n" +
            "    \n" +
            "</body>\n" +
            "</html>\n";

    public static String getAppointmentTemplate(String text){
        return APPOINTMENT_TEMPLATE.replace("{{CONTENT_PLACEHOLDER}}", text);
    }

    public static String getOrderTemplate(List<ProductTemplateDto> productTemplateDtos, String address, String total){
        StringBuilder tableRows = new StringBuilder();

        for (ProductTemplateDto product : productTemplateDtos) {
            tableRows.append("<tr style=\"text-align: center;\">\n")
                    .append("<td>").append(product.getName()).append("</td>\n")
                    .append("<td>").append(product.getQuantity()).append("</td>\n")
                    .append("<td>").append(product.getPrice()).append("</td>\n")
                    .append("</tr>\n");
        }
        String template = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<title></title>\n" +
                "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
                "<style type=\"text/css\">\n" +
                "\n" +
                "body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\n" +
                "table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\n" +
                "img { -ms-interpolation-mode: bicubic; }\n" +
                "\n" +
                "img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }\n" +
                "table { border-collapse: collapse !important; }\n" +
                "body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }\n" +
                "\n" +
                "\n" +
                "a[x-apple-data-detectors] {\n" +
                "    color: inherit !important;\n" +
                "    text-decoration: none !important;\n" +
                "    font-size: inherit !important;\n" +
                "    font-family: inherit !important;\n" +
                "    font-weight: inherit !important;\n" +
                "    line-height: inherit !important;\n" +
                "}\n" +
                "\n" +
                "@media screen and (max-width: 480px) {\n" +
                "    .mobile-hide {\n" +
                "        display: none !important;\n" +
                "    }\n" +
                "    .mobile-center {\n" +
                "        text-align: center !important;\n" +
                "    }\n" +
                "}\n" +
                "div[style*=\"margin: 16px 0;\"] { margin: 0 !important; }\n" +
                "</style>\n" +
                "<body style=\"margin: 0 !important; padding: 0 !important; background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\n" +
                "\n" +
                "\n" +
                "<div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\">\n" +
                "For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. \n" +
                "</div>\n" +
                "\n" +
                "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                "    <tr>\n" +
                "        <td align=\"center\" style=\"background-color: #eeeeee;\" bgcolor=\"#eeeeee\">\n" +
                "        \n" +
                "        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\n" +
                "            <tr>\n" +
                "                <td style=\"background-color: white !important;\" align=\"center\" valign=\"top\" style=\"font-size:0; padding: 35px;\" bgcolor=\"#F44336\">\n" +
                "               \n" +
                "                <div style=\"display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;\">\n" +
                "                    <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\n" +
                "                        <tr>\n" +
                "                            <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;\" class=\"mobile-center\">\n" +
                "                              <img style=\"margin-top: 10%;\" src=\"https://storage.googleapis.com/fastlearner-bucket/PREVIEW_THUMBNAIL/srtQ8Zga_logo.png\" alt=\"\">\n" +
                "                            </td>\n" +
                "                        </tr>\n" +
                "                    </table>\n" +
                "                </div>\n" +
                "                \n" +
                "                <!-- <div style=\"display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;\" class=\"mobile-hide\">\n" +
                "                    <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\n" +
                "                        <tr>\n" +
                "                            <td align=\"right\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;\">\n" +
                "                                <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"right\">\n" +
                "                                    <tr>\n" +
                "                                        <td style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;\">\n" +
                "                                            <p style=\"font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;\"><a href=\"#\" target=\"_blank\" style=\"color: #ffffff; text-decoration: none;\">Shop &nbsp;</a></p>\n" +
                "                                        </td>\n" +
                "                                        <td style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;\">\n" +
                "                                            <a href=\"#\" target=\"_blank\" style=\"color: #ffffff; text-decoration: none;\"><img src=\"https://img.icons8.com/color/48/000000/small-business.png\" width=\"27\" height=\"23\" style=\"display: block; border: 0px;\"/></a>\n" +
                "                                        </td>\n" +
                "                                    </tr>\n" +
                "                                </table>\n" +
                "                            </td>\n" +
                "                        </tr>\n" +
                "                    </table>\n" +
                "                </div> -->\n" +
                "              \n" +
                "                </td>\n" +
                "            </tr>\n" +
                "            <tr>\n" +
                "                <td align=\"center\" style=\"padding: 35px 35px 20px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\n" +
                "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\n" +
                "                    <tr>\n" +
                "                        <td align=\"center\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;\">\n" +
                "                            <img src=\"https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png\" width=\"125\" height=\"120\" style=\"display: block; border: 0px;\" /><br>\n" +
                "                            <h2 style=\"font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;\">\n" +
                "                                Thank You For Your Order!\n" +
                "                            </h2>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                        <td align=\"left\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;\">\n" +
                "                            <p style=\"font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;\">\n" +
                "                                We have received your order and it is being processed. Here are the details:</p>\n" +
                "                            </p>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                        <td align=\"left\" style=\"padding-top: 20px;\">\n" +
                "                            <table style=\"width: 100%;\">\n" +
                "                                <tr style=\"text-align: center;\">\n" +
                "                                    <th>Item</th>\n" +
                "                                    <th>Quantity</th>\n" +
                "                                    <th>Price</th>\n" +
                "                                </tr>\n" +
                tableRows.toString() +
                "                            </table>\n" +
                "            \n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                    <tr>\n" +
                "                        <td align=\"left\" style=\"padding-top: 20px;\">\n" +
                "                            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" width=\"100%\">\n" +
                "                                <tr>\n" +
                "                                    <td width=\"75%\" align=\"left\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;\">\n" +
                "                                        TOTAL\n" +
                "                                    </td>\n" +
                "                                    <td width=\"25%\" align=\"left\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;\">\n" +
                "                                        "+total+"\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                            </table>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                </table>\n" +
                "                \n" +
                "                </td>\n" +
                "            </tr>\n" +
                "             <tr>\n" +
                "                <td align=\"center\" height=\"100%\" valign=\"top\" width=\"100%\" style=\"padding: 0 35px 35px 35px; background-color: #ffffff;\" bgcolor=\"#ffffff\">\n" +
                "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:660px;\">\n" +
                "                    <tr>\n" +
                "                        <td align=\"center\" valign=\"top\" style=\"font-size:0;\">\n" +
                "                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\n" +
                "\n" +
                "                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\n" +
                "                                    <tr>\n" +
                "                                        <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;\">\n" +
                "                                            <p style=\"font-weight: 800;\">Delivery Address</p>\n" +
                "                                            <p>"+address+"</p>\n" +
                "\n" +
                "                                        </td>\n" +
                "                                    </tr>\n" +
                "                                </table>\n" +
                "                            </div>\n" +
                "                            <div style=\"display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;\">\n" +
                "                                <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:300px;\">\n" +
                "                                    <tr>\n" +
                "                                        <td align=\"left\" valign=\"top\" style=\"font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;\">\n" +
                "                                            <p style=\"font-weight: 800;\">Estimated Delivery Date</p>\n" +
                "                                            <p>January 1st, 2016</p>\n" +
                "                                        </td>\n" +
                "                                    </tr>\n" +
                "                                </table>\n" +
                "                            </div>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                </table>\n" +
                "                </td>\n" +
                "            </tr>\n" +
                "            <!-- <tr>\n" +
                "                <td align=\"center\" style=\" padding: 35px; background-color: #ff7361;\" bgcolor=\"#1b9ba3\">\n" +
                "                <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:600px;\">\n" +
                "                    <tr>\n" +
                "                        <td align=\"center\" style=\"padding: 25px 0 15px 0;\">\n" +
                "                            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
                "                                <tr>\n" +
                "                                    <td align=\"center\" style=\"border-radius: 5px;\" bgcolor=\"#66b3b7\">\n" +
                "                                      <a href=\"#\" target=\"_blank\" style=\"font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #F44336; padding: 15px 30px; border: 1px solid #F44336; display: block;\">Shop Again</a>\n" +
                "                                    </td>\n" +
                "                                </tr>\n" +
                "                            </table>\n" +
                "                        </td>\n" +
                "                    </tr>\n" +
                "                </table>\n" +
                "                </td>\n" +
                "            </tr> -->\n" +
                "        </table>\n" +
                "        </td>\n" +
                "    </tr>\n" +
                "</table>\n" +
                "    \n" +
                "</body>\n" +
                "</html>\n";
        return template;
    }
}
