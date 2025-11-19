package com.skillswap.controller;

import com.skillswap.dto.request.ReportCreateRequest;
import com.skillswap.model.Report;
import com.skillswap.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<Report> create(@RequestBody ReportCreateRequest req) {
        Report r = reportService.createReport(req);
        return ResponseEntity.status(201).body(r);
    }

    @GetMapping
    public ResponseEntity<List<Report>> listByStatus(@RequestParam(required = false) String status) {
        if (status == null) status = "OPEN";
        List<Report> list = reportService.listReportsByStatus(status);
        return ResponseEntity.ok(list.stream().collect(Collectors.toList()));
    }
}
