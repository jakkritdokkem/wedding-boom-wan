'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, QrCode, CreditCard, Sparkles, X } from 'lucide-react';
import { WEDDING_DATA } from '@/lib/wedding-data';
import { copyTextToClipboard } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';
import { BankAccount } from '@/types/wedding';

export function BlessingBoxSection() {
  const { couple } = WEDDING_DATA;
  const { showToast } = useToast();
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [activeQrAccount, setActiveQrAccount] = useState<BankAccount | null>(null);

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
    <section id="blessing-box-section" className="py-20 px-4 sm:px-6 bg-[#f4f1ea]/55">
      <div className="max-w-4xl mx-auto text-center font-thai-serif">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white shadow-xs text-[#47572a] text-xs font-semibold uppercase tracking-widest mb-3"
        >
          <Gift className="w-3.5 h-3.5 text-[#66754e]" />
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
              className="fabric-card fabric-stitch rounded-[40px] p-7 sm:p-9 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[#faf8f5] border border-[#c9ceb8] text-[#47572a]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#faf8f5] border border-[#e2e6d8] text-[#47572a]">
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
                <div className="p-3.5 rounded-2xl bg-[#faf8f5] border border-[#c9ceb8] flex items-center justify-between">
                  <span className="font-mono text-base sm:text-lg font-bold text-[#47572a] tracking-wider">
                    {acc.accountNumber}
                  </span>

                  <button
                    onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#c9ceb8] text-[#47572a] text-xs font-medium hover:bg-[#47572a] hover:text-white hover:border-[#47572a] transition active:scale-95 shadow-2xs cursor-pointer"
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
              <div className="mt-6 pt-4 border-t border-[#e2e6d8] flex items-center justify-between text-xs text-[#576543]">
                <span className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#47572a]" />
                  <span>พร้อมเพย์: {acc.promptPayId}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveQrAccount(acc)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#faf8f5] border border-[#c9ceb8] hover:bg-[#47572a] text-[#47572a] hover:text-white font-semibold transition cursor-pointer"
                >
                  เปิดดู QR Code
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-[#66754e] mt-8 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#66754e]" />
          <span>ทุกของขวัญและคำอวยพรคือกำลังใจอันล้ำค่าสำหรับการเริ่มต้นชีวิตคู่ของเรา</span>
        </p>
      </div>

      {/* Interactive PromptPay QR Modal */}
      <AnimatePresence>
        {activeQrAccount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveQrAccount(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-thai-serif"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-sm w-full p-6 border-2 border-[#c9ceb8] shadow-2xl text-center relative"
            >
              <button
                onClick={() => setActiveQrAccount(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#faf8f5] text-[#47572a] hover:bg-[#c9ceb8]/50 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="inline-block px-3 py-1 rounded-full bg-[#faf8f5] border border-[#c9ceb8] text-[#47572a] text-xs font-semibold mb-2">
                Thai QR PromptPay
              </span>
              <h3 className="text-lg font-bold text-[#47572a]">{activeQrAccount.bankName}</h3>
              <p className="text-xs text-[#576543] mt-0.5">{activeQrAccount.accountName}</p>

              {/* Styled PromptPay QR Representation */}
              <div className="my-5 p-5 rounded-2xl bg-[#faf8f5] border border-[#c9ceb8] inline-flex flex-col items-center justify-center">
                <div className="w-44 h-44 bg-white rounded-xl p-3 border border-[#c9ceb8] flex flex-col items-center justify-center relative">
                  <QrCode className="w-32 h-32 text-[#47572a]" strokeWidth={1.5} />
                  <span className="text-[10px] font-mono text-[#66754e] mt-1">
                    PromptPay: {activeQrAccount.promptPayId}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f4f1ea] text-xs text-[#47572a] space-y-1 mb-4">
                <p>เลขที่บัญชี: <strong className="font-mono">{activeQrAccount.accountNumber}</strong></p>
                <p>เบอร์พร้อมเพย์: <strong className="font-mono">{activeQrAccount.promptPayId}</strong></p>
              </div>

              <button
                onClick={() => handleCopy(activeQrAccount.accountNumber, activeQrAccount.bankName)}
                className="w-full py-3 rounded-xl bg-[#47572a] text-white text-xs sm:text-sm font-semibold hover:bg-[#374421] transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>คัดลอกเลขที่บัญชี</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
