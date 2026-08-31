'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, QrCode, CreditCard, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { copyTextToClipboard } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';

export function BlessingBoxSection() {
  const { couple } = WEDDING_DATA;
  const { showToast } = useToast();
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = async (accountNumber: string, bankName: string) => {
    const cleanNumber = accountNumber.replace(/-/g, '');
    const success = await copyTextToClipboard(cleanNumber);
    if (success) {
      setCopiedAccount(accountNumber);
      showToast(`คัดลอกเลขบัญชี ${bankName} (${cleanNumber}) เรียบร้อยแล้ว`, 'success');
      setTimeout(() => setCopiedAccount(null), 3000);
    }
  };

  return (
    <section id="blessing-box-section" className="py-24 px-4 sm:px-6 bg-[#f5ebe2]/60 border-t border-[#d8decb]">
      <div className="max-w-4xl mx-auto text-center font-thai-serif">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9ceb8]/40 text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Blessing Box &amp; Gift Registry</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-thai-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#47572a] mb-3"
        >
          กล่องของขวัญและร่วมยินดี
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#576543] text-sm sm:text-base max-w-lg mx-auto"
        >
          สำหรับแขกผู้มีเกียรติที่ไม่สะดวกเดินทางมาร่วมงาน หรือมีความประสงค์จะร่วมแสดงความยินดีและส่งต่อของขวัญให้แก่คู่บ่าวสาว
        </motion.p>

        {/* Bank Accounts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
          {couple.bankAccounts.map((acc, index) => (
            <motion.div
              key={acc.accountNumber}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c9ceb8]/60 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[#f4f1ea] border border-[#c9ceb8] text-[#47572a]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#f4f1ea] text-[#47572a]">
                    PromptPay / Transfer
                  </span>
                </div>

                <h3 className="font-bold text-[#47572a] text-base sm:text-lg mb-1">
                  {acc.bankName}
                </h3>

                <p className="text-xs text-[#576543] mb-4">
                  ชื่อบัญชี: <span className="text-[#47572a] font-medium">{acc.accountName}</span>
                </p>

                {/* Account Number Box */}
                <div className="p-3.5 rounded-2xl bg-[#f4f1ea] border border-[#c9ceb8] flex items-center justify-between">
                  <span className="font-mono text-base sm:text-lg font-bold text-[#47572a] tracking-wider">
                    {acc.accountNumber}
                  </span>

                  <button
                    onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#c9ceb8] text-[#47572a] text-xs font-medium hover:bg-[#47572a] hover:text-white hover:border-[#47572a] transition active:scale-95 shadow-sm"
                  >
                    {copiedAccount === acc.accountNumber ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>คัดลอกเลขบัญชี</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code Helper Box */}
              <div className="mt-6 pt-4 border-t border-[#d8decb] flex items-center justify-between text-xs text-[#576543]">
                <span className="flex items-center gap-1">
                  <QrCode className="w-4 h-4 text-[#47572a]" />
                  <span>พร้อมเพย์: {acc.promptPayId}</span>
                </span>
                <span className="text-[#47572a] font-medium">สแกนผ่าน Mobile Banking</span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-[#66754e] mt-8 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ทุกของขวัญและคำอวยพรคือกำลังใจอันล้ำค่าสำหรับการเริ่มต้นชีวิตคู่ของเรา</span>
        </p>
      </div>
    </section>
  );
}
