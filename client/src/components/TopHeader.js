import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import path from '../ultils/path';
const TopHeader = () => {
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ĐẶT HÀNG TRỰC TUYẾN HOẶC GỌI CHO CHÚNG TÔI (+1800) 000 8808</span>
        <Link to={`/${path.LOGIN}`}>Đăng nhập hoặc tạo tài khoản</Link>
      </div>
    </div>
  );
}

export default memo(TopHeader);