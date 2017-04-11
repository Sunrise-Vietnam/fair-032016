import React from 'react';
import styles from '../../main.scss';

export default class Thanks extends React.Component {
    componentDidMount(){
	    fbq('track', 'CompleteRegistration');
        if(ga){
            ga('send', 'event', 'Register', 'Register Completed', 'Success', 0);
        }
        //var goConversion = new Image();
        //goConversion.onload = function(){
        //    console.info('google conversion...');
        //}
        //goConversion.src = '//www.googleadservices.com/pagead/conversion/1017172282/?label=x5h4CLuWlWQQmNyBugM&amp;guid=ON&amp;script=0';
    }
    render() {
        return <div>
            <div className="container-fluid">
                <img width="100%" className="img-responsive hidden-xs"
                     src={require("../../photos/thanks/tk-header.png")}/>
                <img width="100%" className="img-responsive visible-xs"
                     src={require("../../photos/thanks/tk-headersmall.png")}/>
                <div className="col-xs-2 col-xs-offset-3 img-links text-right">
                    <a href="mailto:info@sunrisevietnam.com">
                        <img src={require("../../photos/thanks/mail.png")}/></a>
                </div>
                <div className="col-xs-2 img-links text-center">
                    <a target="_blank" href="http://sunrisevietnam.com">
                        <img src={require("../../photos/thanks/globe.png")}/></a>
                </div>
                <div className="col-xs-2 img-links text-left">
                    <a target="_blank" href="http://fb.com/thaiduong.vietnam">
                        <img src={require("../../photos/thanks/fb.png")}/></a>
                </div>
            </div>
            <div className="container">
                <div className={`${styles.smallSpacing}`}></div>
                <div className="row">
                    <div className={`col-xs-12 text-center`}>
                        <h3 className={`${styles.bold}`}>Cảm ơn bạn đã đăng ký</h3>
                        <h2 className={`${styles.bold} ${styles.orange}`}>NHẬN TƯ VẤN KHÓA HỌC VÀ NHẬN TÀI LIỆU IELTS</h2>
                        <h3 className="text-center black">SUNRISE VIETNAM sẽ gọi điện hoặc email tới bạn để xác nhận lại.</h3>
                        <div className={`${styles.smallSpacing}`}></div>
                        <div className={`${styles.smallSpacing}`}></div>
                    </div>
                    <div className={`col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-4 col-md-2 col-md-offset-5 text-center`}>
                        <img className="img-responsive" src={require("../../photos/logo.png")} width="100%"/>
                        <div className={`${styles.mediumSpacing}`}></div>
                    </div>
                </div>
                <div className="space"></div>
            </div>
            <div className="container">
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <p className={`red ${styles.semiBold}`}>TRỤ SỞ CHÍNH</p>
                    <p className="mblue">
                        <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; 86 Cửa Bắc, Ba Đình, Hà Nội<br/>
                        <img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp;&nbsp; (84-43) 722 4878 - 722 4898
                    </p>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <p className={`red ${styles.semiBold}`}>VĂN PHÒNG TIMES CITY</p>
                    <p className="mblue">
                        <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; Tầng 2 tòa nhà T5, Times City, 458 Minh Khai, Hai Bà Trưng, Hà Nội<br/>
                        <img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp;&nbsp; (84-43) 200 4743 - 204 8333
                    </p>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <p className={`red ${styles.semiBold}`}>VĂN PHÒNG HẢI PHÒNG</p>
                    <p className="mblue">
                        <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; 29 Nguyễn Trãi, Ngô
                        Quyền <br/>
                        <img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp;&nbsp; (84-31) 264 0689 - 365 3269
                    </p>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3">
                    <p className={`red ${styles.semiBold}`}>VĂN PHÒNG HỒ CHÍ MINH</p>
                    <p className="mblue">
                        <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; Lầu 7 tòa nhà Thanh
                        Dung, 179 Nguyễn Cư Trinh, Q.1 <br/>
                        <img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp;&nbsp; (84-8) 3837 0176 - 3837 0226
                    </p>
                </div>
            </div>
            <div style={{display:'inline'}}>
                <img height="1" width="1" style={{"borderStyle": "none"}} alt="" src="//www.googleadservices.com/pagead/conversion/1017172282/?label=f4XPCPLbkWoQuqKD5QM&amp;guid=ON&amp;script=0"/>
            </div>
        </div>
    }
}
