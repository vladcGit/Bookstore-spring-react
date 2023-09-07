package com.vlad.springbootlibrary.controller;

import com.vlad.springbootlibrary.requestmodels.AddBookRequest;
import com.vlad.springbootlibrary.service.AdminService;
import com.vlad.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token,
                         @RequestBody AddBookRequest addBookRequest)throws Exception{
        String admin = ExtractJWT.payloadJwtExtraction(token,"\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }

        adminService.postBook(addBookRequest);
    }
}
