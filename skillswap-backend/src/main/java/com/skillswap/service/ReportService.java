package com.skillswap.service;

import com.skillswap.dto.request.ReportCreateRequest;
import com.skillswap.model.Report;
import com.skillswap.model.SkillExchange;
import com.skillswap.repository.ReportRepository;
import com.skillswap.repository.SkillExchangeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final SkillExchangeRepository exchangeRepository;

    public ReportService(ReportRepository reportRepository, SkillExchangeRepository exchangeRepository) {
        this.reportRepository = reportRepository;
        this.exchangeRepository = exchangeRepository;
    }

    public Report createReport(ReportCreateRequest req) {
        Report r = new Report();
        r.setReporterId(req.getReporterId());
        r.setReportedUserId(req.getReportedUserId());
        r.setReportType(req.getReportType());
        r.setDescription(req.getDescription());
        r.setStatus("OPEN");
        if (req.getExchangeId() != null) {
            SkillExchange e = exchangeRepository.findById(req.getExchangeId()).orElse(null);
            r.setExchange(e);
        }
        r.setCreatedAt(LocalDateTime.now());
        return reportRepository.save(r);
    }

    public List<Report> listReportsByStatus(String status) {
        return reportRepository.findByStatus(status);
    }
}
