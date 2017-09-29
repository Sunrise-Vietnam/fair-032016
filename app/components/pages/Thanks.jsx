import React from 'react';
import styles from '../../main1703.scss';

export default class Thanks extends React.Component {
    componentDidMount(){
	    /*fbq('track', 'CompleteRegistration');
        if(ga){
            ga('send', 'event', 'Register', 'Register Completed', 'Success', 0);
        }*/
        //var goConversion = new Image();
        //goConversion.onload = function(){
        //    console.info('google conversion...');
        //}
        //goConversion.src = '//www.googleadservices.com/pagead/conversion/1017172282/?label=x5h4CLuWlWQQmNyBugM&amp;guid=ON&amp;script=0';
    }
    render() {
        return <div className="container-fluid">
            <div className="row">
                <img width="100%" className="img-responsive hidden-xs"
                     src={require("../../photos/201710/tk-banner.png")}/>
                <img width="100%" className="img-responsive visible-xs"
                     src={require("../../photos/201710/tk-banner-small.png")}/>
            </div>
            <div className="container">
                <div className={styles.mdSpace}></div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-3 text-right">
                        <a href="mailto:info@sunrisevietnam.com" target="_blank">
                            <img src={require("../../photos/201710/tk-mail.png")}/></a>
                    </div>
                    <div className="col-xs-2 text-center">
                        <a href="http://sunrisevietnam.com" target="_blank">
                            <img src={require("../../photos/201710/tk-world.png")}/></a>
                    </div>
                    <div className="col-xs-2 text-left">
                        <a href="http://fb.com/thaiduong.vietnam" target="_blank">
                            <img src={require("../../photos/201710/tk-fb.png")}/></a>
                    </div>
                </div>
                <div className={styles.mdSpace}></div>
                <div className="row">
                    <div className="col-xs-12 bold">
                        <h3 className="text-center black">Cảm ơn bạn đã đăng ký tham gia triển lãm <br
                            className="visible-xs"/><span className={`${styles.size33} ${styles.lgreen}`}>THẾ GIỚI DU HỌC 2017</span></h3>

                        <h3 className="text-center black">Trước khi sự kiện diễn ra 1 tuần, SUNRISE VIETNAM sẽ gọi
                            điện hoặc email tới bạn để xác nhận lại.</h3>
                        <br/>
                        <h3 className={`text-center ${styles.lgreen}`}>HÃY CHIA SẺ THÔNG TIN TRIỂN LÃM ĐẾN BẠN BÈ<br/>VÀ NHỮNG
                            NGƯỜI QUAN TÂM NHÉ!</h3>

                        <h3 className="text-center black">Chân thành cảm ơn và hẹn gặp lại bạn tại triển lãm.</h3>

                        <div className={styles.mdSpace}></div>
                        <h3 className="text-center">SUNRISE VIETNAM</h3>
                    </div>
                </div>
                <footer>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <h5 className="semibold">TRỤ SỞ CHÍNH</h5>
                            <p className="text-uppercase">
                                <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; 86 Cửa Bắc, Ba Đình, Hà Nội<br/>
                                &nbsp;<img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp; Tel: 024 3722 4878 - 3722 4898
                            </p>
                            <div className={styles.smSpace}></div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <h5 className="semibold">VĂN PHÒNG TIMES CITY</h5>
                            <p className="text-uppercase">
                                <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; TẦNG 2, TOÀ NHÀ T5,<br/>
                                KHU VĂN PHÒNG TIMES CITY<br/>
                                458 MINH KHAI, Q. HAI BÀ TRƯNG, HÀ NỘI<br/>
                                &nbsp;<img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp; Tel: 024 3200 4743 - 024 3204 8333
                            </p>
                            <div className={styles.smSpace}></div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <h5 className="semibold">VĂN PHÒNG HẢI PHÒNG</h5>
                            <p className="text-uppercase">
                                <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; TẦNG 5 TOÀ NHÀ XỔ SỐ,<br/>
                                19 ĐIỆN BIÊN PHỦ, Q. NGÔ QUYỀN<br/>
                                &nbsp;<img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp; Tel: 0225 365 3269
                            </p>
                            <div className={styles.smSpace}></div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3">
                            <h5 className="semibold">VĂN PHÒNG HỒ CHÍ MINH</h5>
                            <p className="mblue text-uppercase">
                                <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; Lầu 7, Tòa nhà Thanh
                                Dung,<br/>179 Nguyễn Cư Trinh, Q.1 <br/>
                                &nbsp;<img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp; Tel: 028 3837 0176 - 3837 0226
                            </p>
                            <div className={styles.smSpace}></div>
                        </div>
                    </div>
                </footer>
                <div className="smallspace"></div>
            </div>
            <div style={{display:'inline'}}>
                <img height="1" width="1" style={{"borderStyle": "none"}} alt="" src="//www.googleadservices.com/pagead/conversion/1017172282/?label=f4XPCPLbkWoQuqKD5QM&amp;guid=ON&amp;script=0"/>
            </div>
        </div>
    }
}
