import React from 'react';

export default class Thanks extends React.Component {
    componentDidMount(){
	    fbq('track', 'CompleteRegistration');
        var goConversion = new Image();
        goConversion.onload = function(){
            console.info('google conversion...');
        }
        goConversion.src = '//www.googleadservices.com/pagead/conversion/1017172282/?label=x5h4CLuWlWQQmNyBugM&amp;guid=ON&amp;script=0';
    }
    render() {
        return <div className="container-fluid">
            <div className="row tk-header">
                <img width="100%" className="img-responsive bigimg hidden-xs"
                     src={require("../../photos/thanks/tk-header.png")}/>
                <img width="100%" className="img-responsive smallimg visible-xs"
                     src={require("../../photos/thanks/tk-headersmall.png")}/>

                <div className="row">
                    <div className="col-xs-2 col-xs-offset-3 img-links text-right">
                        <a href="mailto:info@sunrisevietnam.com"><img
                            src={require("../../photos/thanks/mail.png")}/></a>
                    </div>
                    <div className="col-xs-2 img-links text-center">
                        <a href="http://sunrisevietnam.com"><img
                            src={require("../../photos/thanks/globe.png")}/></a>
                    </div>
                    <div className="col-xs-2 img-links text-left">
                        <a href="http://fb.com/thaiduong.vietnam"><img src={require("../../photos/thanks/fb.png")}/></a>
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="smallspace"></div>
                <div className="row">
                    <div className="col-xs-12 bold">
                        <h3 className="text-center black">Cảm ơn bạn đã đăng ký tham gia triển lãm <br
                            className="visible-xs"/><span className="size33 orange">THẾ GIỚI DU HỌC 2016</span></h3>

                        <h3 className="text-center black">Trước khi sự kiện diễn ra 1 tuần, SUNRISE VIETNAM sẽ gọi
                            điện hoặc email tới bạn để xác nhận lại.</h3>
                        <br/>

                        <h3 className="text-center dorange">HÃY CHIA SẺ THÔNG TIN TRIỂN LÃM ĐẾN BẠN BÈ<br/>VÀ NHỮNG
                            NGƯỜI QUAN TÂM NHÉ!</h3>

                        <h3 className="text-center black">Chân thành cảm ơn và hẹn gặp lại bạn tại triển lãm.</h3>

                        <h3 className="text-center red">SUNRISE VIETNAM</h3>
                    </div>
                </div>
                <div className="space"></div>
                <footer>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <p className="red semibold">TRỤ SỞ CHÍNH SUNRISE VIETNAM</p>

                            <p className="mblue text-uppercase">
                                <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; 86 Cửa Bắc - Ba Đình -
                                Hà Nội<br/>
                                <img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp;&nbsp; Tel: (84-4)
                                3722.4878 - 3722.4898<br/>
                                <img src={require("../../photos/thanks/tk-printer.png")}/>&nbsp;&nbsp;Fax: (84-4)
                                3722.4855</p>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <p className="red semibold">VĂN PHÒNG HẢI PHÒNG</p>

                            <p className="mblue text-uppercase">
                                <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; 29 Nguyễn Trãi - Ngô
                                Quyền <br/>
                                <img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp;&nbsp; Tel: (84-31)
                                2640689 - 3653269 <br/>
                                <img src={require("../../photos/thanks/tk-printer.png")}/>&nbsp;&nbsp;Fax: (84-31)
                                3732895
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <p className="red semibold">VĂN PHÒNG HỒ CHÍ MINH</p>

                            <p className="mblue text-uppercase">
                                <img src={require("../../photos/thanks/tk-home.png")}/>&nbsp; Lầu 7, Tòa nhà Thanh
                                Dung, số 179 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh, Q.1 <br/>
                                <img src={require("../../photos/thanks/tk-mobile.png")}/>&nbsp;&nbsp; Tel: (84-8)
                                38370176 - 38370226 <br/>
                                <img src={require("../../photos/thanks/tk-printer.png")}/>&nbsp;&nbsp;Fax: (84-8)
                                38360940</p>
                        </div>
                    </div>
                </footer>
                <div className="smallspace"></div>
            </div>
        </div>
    }
}
