let currentRepairCode = "";
let isRepairValid = false;
let totalRevenue = 0;
let totalRepairs = 0;

let choice;

do {
    choice = Number(prompt(`
==========================================
HỆ THỐNG DỊCH VỤ AUTOCARE GARAGE
==========================================
1. Nhập và kiểm chuẩn mã phiếu sửa chữa
2. Tính chi phí sửa chữa
3. Thẩm định mã thẻ khách hàng may mắn
0. Thoát chương trình
==========================================
Vui lòng nhập lựa chọn của bạn (0 - 3): `))

        switch(choice){
            case 1: {
                let input = prompt("Vui long nhap ma phieu sua chua: ");
                if (input === null){
                    console.log("Ma phieu khong duoc de trong!");
                    break;
                }

                let repairCode = input.trim().toUpperCase();
                if (repairCode === ""){
                    console.log("Ma phieu dang trong!");
                    break;
                }

                if (repairCode.length < 6){
                    console.log("Do dai toi thieu cua ma phai la 6 ky tu!");
                    break;
                }

                if (!repairCode.startsWith("CAR-")){
                    console.log("Ma phai bat dau bang CAR- !");
                    break;
                }

                if (repairCode.includes(" ")){
                    console.log("Ma khong duoc chua khoang trang o giua!");
                    break;
                }

                currentRepairCode = repairCode;
                isRepairValid = true;
                console.log("Thanh cong!");
                break;
            }

            case 2: {
                if (isRepairValid === false){
                    console.log("Vui long nhap ma sua chua o chuc nang 1!");
                    break;
                }

                let jobCount = 0;
                let pricePerJob = 0;
            
                let inputJobCount = Number(prompt("Vui long nhap so luong job: "));
                if (inputJobCount === null){
                    console.log("So luong job khong duoc de trong!");
                    break;
                }
                jobCount += inputJobCount;

                let inputPricePerJob = Number(prompt("Vui long nhap gia cua job: "));
                if (inputPricePerJob === null){
                    console.log("Gia cua job khong duoc de trong!");
                    break;
                }
                pricePerJob += inputPricePerJob;

                let baseCount = jobCount * pricePerJob; 
                let discount = 0;
                if (jobCount >= 4){
                    discount = baseCount * 0.1;
                }
                let materialFee = (baseCount - discount) * 0.08;
                totalPayment = (baseCount - discount) + materialFee;
                totalRevenue += totalPayment;
                totalRepairs++;
                currentRepairCode = "";
                isRepairValid = false;
                console.log(`
                    ============= DON GIA =============
                    So luong job: ${jobCount}
                    Gia cua job: ${pricePerJob}
                    Chi phi co so; ${baseCount}
                    Giam gia: ${discount}
                    Phu phi: ${materialFee}
                    ====================================
                    Tong thanh toan: ${totalPayment}
                    `);
                break;
            }

            case 3: {
                let ticketCode = prompt("Vui long nhap chuoi so in tren the khach hang than thiet: ").trim();
                if (ticketCode === null){
                    console.log("Khong duoc de trong!");
                    break;
                }

                if (!/[0-9]+/.test(ticketCode)){
                    console.log("Chuoi so chi gom ky tu 0 - 9!");
                    break;
                }

                if (ticketCode.length < 2){
                    console.log("Chuoi so phai co tu 2 chu so tro len!");
                    break;
                }

                if (!/[0]+/.test(ticketCode)){
                    console.log("Chuoi so khong duoc nhap toan chu so 0!");
                    break;
                }

                let reverseCode = "";
                for (let i = ticketCode.length - 1; i >= 0; i--){
                    reverseCode += ticketCode[i];
                }
                let isPalindrome = ticketCode === reverseCode;
                let digitSum = 0;
                for (let i = 0 ; i<  ticketCode.length; i++){
                    digitSum += Number(ticketCode[i]);
                }

                let numberIsDividedByNine = digitSum % 9 === 0;;
                let rank = "";
                if (reverseCode && numberIsDividedByNine){
                    rank = "Giai dac biet";
                }else if(reverseCode){
                    rank = "Giai nhat";
                }else if (numberIsDividedByNine){
                    rank = "Giai nhi";
                }else{
                    rank = "Khong trung thuong";
                }
                
                console.log(`
                    Chuoi so: ${ticketCode}
                    Dao nguoc: ${reverseCode}
                    Tong chu so: ${digitSum}
                    Chi het 9: ${numberIsDividedByNine}
                    Ket qua: ${rank}
                    `);
                break;
            }

            case 0: {
                let avgRevenue = totalRevenue % totalRepairs;
                console.log(`
                    BÁO CÁO TỔNG KẾT CA LÀM VIỆC
                    Tổng số phiếu sửa chữa đã thanh toán: ${totalRepairs}
                    Tổng doanh thu: ${totalRevenue}
                    Doanh thu trung bình: ${avgRevenue}
                    `);
                console.log("Thoat chuong trinh!");
                break;
            }

            default: {
                console.log("Lua chon khong hop le!");
                break;
            }
        }

} while (choice != 3);