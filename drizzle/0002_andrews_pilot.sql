INSERT OR IGNORE INTO clients (id,company,contact,email,package,monthly_price,activation_fee,status,onboarding_status,access_status,content_cycle_status,approval_status,metricool_status,reporting_status,notes,created_at)
VALUES ('NEC-C001','Andrew''s Landscaping','TBD',NULL,'Starter',400,150,'Pending signature','Not sent','Missing','Not started','Not started','Not connected','Not due','Founding-client pilot. $150 activation; Months 1 and 2 waived; Month 3 $400 less $150 activation credit = $250; Month 4 onward $400. Initial commitment through Month 3. Start and billing dates TBD after signature.',CURRENT_TIMESTAMP);
--> statement-breakpoint
INSERT OR IGNORE INTO invoices (id,client_id,cycle,type,base_amount,credit,amount_due,due_date,status,notes) VALUES
('NEC-C001-ACT','NEC-C001','Activation','Activation',150,0,150,NULL,'Planned','Due at signing; credited to Month 3 after payment.'),
('NEC-C001-M01','NEC-C001','Month 1','Monthly',400,400,0,NULL,'Planned','Founding-client service fee waived.'),
('NEC-C001-M02','NEC-C001','Month 2','Monthly',400,400,0,NULL,'Planned','Founding-client service fee waived.'),
('NEC-C001-M03','NEC-C001','Month 3','Monthly',400,150,250,NULL,'Planned','Activation credit; contingent on $150 activation payment.'),
('NEC-C001-M04','NEC-C001','Month 4 onward','Monthly',400,0,400,NULL,'Planned','Normal recurring Starter amount. Create dated monthly invoice each cycle.');
--> statement-breakpoint
INSERT OR IGNORE INTO content (id,client_id,cycle,number,stage,updated_at)
WITH RECURSIVE slots(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM slots WHERE n<12)
SELECT 'NEC-C001-M01-' || printf('%02d',n),'NEC-C001','Month 1',n,'Idea',CURRENT_TIMESTAMP FROM slots;
