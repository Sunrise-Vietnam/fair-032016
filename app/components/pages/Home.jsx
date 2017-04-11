import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import DDP from 'ddp.js';
import styles from '../../main.scss';

const _formObj = {
    fullName: null,
    tel: null,
    email: null,
    identity: null,
    city: null,
    study: null,
    aim: null,
    testTime: null,
    consult: null,
    knownBy: [],
};

const _eventCode = 'qnAeDpT9YfTBnPH5Yhzf';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this._saveAndThankYou = this._saveAndThankYou.bind(this);
    }

    componentDidMount() {
        let options = {
            //endpoint: "ws://system.sunrisevietnam.com/websocket",
            endpoint: "ws://localhost:3000/websocket",
            SocketConstructor: WebSocket
        };
        this.ddp = new DDP(options);
        this.ddp.on("connected", function () {
            console.info("Connected to Server...");
        });
        (function($) {
            /**
             * Copyright 2012, Digital Fusion
             * Licensed under the MIT license.
             * http://teamdf.com/jquery-plugins/license/
             *
             * @author Sam Sehnert
             * @desc A small plugin that checks whether elements are within
             *     the user visible viewport of a web browser.
             *     only accounts for vertical position, not horizontal.
             */

            $.fn.visible = function(partial) {

                var $t            = $(this),
                    $w            = $(window),
                    viewTop       = $w.scrollTop(),
                    viewBottom    = viewTop + $w.height(),
                    _top          = $t.offset().top,
                    _bottom       = _top + $t.height(),
                    compareTop    = partial === true ? _bottom : _top,
                    compareBottom = partial === true ? _top : _bottom;

                return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

            };

        })(jQuery);

        setTimeout(function () {
            var win = $(window);

            var allMods = $(".module");

            allMods.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("already-visible");
                }
            });

            win.scroll(function(event) {

                allMods.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("come-in");
                    }
                });

            });
        }, 100)
    }

    _saveAndThankYou(obj) {
        if (obj) {
            const self = this;
            const msgId = this.ddp.method('registerEducation', [_eventCode, obj]);
            this.ddp.on('result', function (msg) {
                if (msgId === msg.id && !msg.error) {
                    self.props.history.pushState(null, "/thank-you")
                }
            })
        }
    }

    render() {
        return <div>
            <Header/>
            <Main onRegister={this._saveAndThankYou}/>
            <Footer/>
        </div>
    }
}

class DefaultForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = _.clone(_formObj);
        this._handleChange = this._handleChange.bind(this);
        this._handleMultiChange = this._handleMultiChange.bind(this);
        this._isFormValid = this._isFormValid.bind(this);
        this._registerSubmit = this._registerSubmit.bind(this);
    }

    componentDidMount() {
        $('.selectpicker').selectpicker();
    }

    _isFormValid() {
        let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (this.state.fullName && regEmail.test(this.state.email) && this.state.tel && this.state.identity && this.state.city && this.state.study && this.state.aim && this.state.testTime && this.state.knownBy.length > 0);
    }

    _registerSubmit() {
        if (this._isFormValid()) {
            this.props.onRegister(this.state)
        }
    }

    _handleChange = (key) => ({
        value: this.state[key],
        onChange: e => {
            this.setState({[key]: e.target.value})
        }
    });

    _handleMultiChange = (key) => ({
        value: this.state[key],
        onChange: e => {
            this.setState({[key]: $(e.target).selectpicker('val')})
        }
    });

    render() {
        return (
            <div className="col-xs-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className={`col-xs-12 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Họ và tên" {...this._handleChange('fullName')}/>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <input className={`form-control ${styles.customInput}`}
                                   placeholder="Số điện thoại"  {...this._handleChange('tel')}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Email"  {...this._handleChange('email')}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select className="form-control selectpicker"
                                    title="Bạn là" {...this._handleChange('identity')}>
                                <option value="Học sinh Tiểu học">Học sinh tiểu học</option>
                                <option value="Học sinh THCS">Học sinh THCS</option>
                                <option value="Học sinh THPT">Học sinh THPT</option>
                                <option value="Sinh viên Đại học">Sinh viên đại học</option>
                                <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                                <option value="Phụ huynh">Phụ huynh</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select className="form-control selectpicker" title="Nơi bạn đang sống" data-size="8"
                                {...this._handleChange('city')}>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="TP HCM">TP Hồ Chí Minh</option>
                                <option value="Hải Phòng">Hải Phòng</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="Cần Thơ">Cần Thơ</option>
                                <option value="An Giang">An Giang</option>
                                <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                <option value="Bắc Giang">Bắc Giang</option>
                                <option value="Bắc Kạn">Bắc Kạn</option>
                                <option value="Bạc Liêu">Bạc Liêu</option>
                                <option value="Bắc Ninh">Bắc Ninh</option>
                                <option value="Bến Tre">Bến Tre</option>
                                <option value="Bình Định">Bình Định</option>
                                <option value="Bình Dương">Bình Dương</option>
                                <option value="Bình Phước">Bình Phước</option>
                                <option value="Bình Thuận">Bình Thuận</option>
                                <option value="Cà Mau">Cà Mau</option>
                                <option value="Cao Bằng">Cao Bằng</option>
                                <option value="Đắk Lắk">Đắk Lắk</option>
                                <option value="Đắk Nông">Đắk Nông</option>
                                <option value="Điện Biên">Điện Biên</option>
                                <option value="Đồng Nai">Đồng Nai</option>
                                <option value="Đồng Tháp">Đồng Tháp</option>
                                <option value="Gia Lai">Gia Lai</option>
                                <option value="Hà Giang">Hà Giang</option>
                                <option value="Hà Nam">Hà Nam</option>
                                <option value="Hà Tĩnh">Hà Tĩnh</option>
                                <option value="Hải Dương">Hải Dương</option>
                                <option value="Hậu Giang">Hậu Giang</option>
                                <option value="Hòa Bình">Hòa Bình</option>
                                <option value="Hưng Yên">Hưng Yên</option>
                                <option value="Khánh Hòa">Khánh Hòa</option>
                                <option value="Kiên Giang">Kiên Giang</option>
                                <option value="Kon Tum">Kon Tum</option>
                                <option value="Lai Châu">Lai Châu</option>
                                <option value="Lâm Đồng">Lâm Đồng</option>
                                <option value="Lạng Sơn">Lạng Sơn</option>
                                <option value="Lào Cai">Lào Cai</option>
                                <option value="Long An">Long An</option>
                                <option value="Nam Định">Nam Định</option>
                                <option value="Nghệ An">Nghệ An</option>
                                <option value="Ninh Bình">Ninh Bình</option>
                                <option value="Ninh Thuận">Ninh Thuận</option>
                                <option value="Phú Thọ">Phú Thọ</option>
                                <option value="Phú Yên">Phú Yên</option>
                                <option value="Quảng Bình">Quảng Bình</option>
                                <option value="Quảng Nam">Quảng Nam</option>
                                <option value="Quảng Ngãi">Quảng Ngãi</option>
                                <option value="Quảng Ninh">Quảng Ninh</option>
                                <option value="Quảng Trị">Quảng Trị</option>
                                <option value="Sóc Trăng">Sóc Trăng</option>
                                <option value="Sơn La">Sơn La</option>
                                <option value="Tây Ninh">Tây Ninh</option>
                                <option value="Thái Bình">Thái Bình</option>
                                <option value="Thái Nguyên">Thái Nguyên</option>
                                <option value="Thanh Hóa">Thanh Hóa</option>
                                <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                <option value="Tiền Giang">Tiền Giang</option>
                                <option value="Trà Vinh">Trà Vinh</option>
                                <option value="Tuyên Quang">Tuyên Quang</option>
                                <option value="Vĩnh Long">Vĩnh Long</option>
                                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                <option value="Yên Bái">Yên Bái</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomMD}`}>
                            <select
                                className="form-control selectpicker"
                                title="Bạn có nhu cầu học"
                                {...this._handleChange('study')}>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="SAT">SAT</option>
                                <option value="GMAT">GMAT</option>
                                <option value="Không">Không</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select
                                className="form-control selectpicker"
                                title="Mục đích bạn học IELTS"
                                {...this._handleChange('aim')}>
                                <option value="Để tốt nghiệp">Để tốt nghiệp</option>
                                <option value="Đi du học">Đi du học</option>
                                <option value="Công việc trong nước">Công việc trong nước</option>
                                <option value="Mục đích khác">Mục đích khác</option>
                            </select>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select
                                className="form-control selectpicker" title="Thời gian dự định du học"
                                {...this._handleChange('testTime')}>
                                <option value="TT Năm 2017">Năm 2017</option>
                                <option value="TT Năm 2018">Năm 2018</option>
                                <option value="TT Năm 2019">Năm 2019</option>
                                <option value="TT Năm 2020">Năm 2020</option>
                                <option value="Chưa có dự định thi">Chưa có dự định thi</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM} ${styles.marginBottomMD}`}>
                            <select className="form-control selectpicker" multiple
                                    title="Bạn biết chương trình này qua"
                                    data-selected-text-format="count>1" data-size="8"
                                {...this._handleMultiChange('knownBy')}>
                                <option value="Facebook SunriseVietnam">Facebook SunriseVietnam</option>
                                <option value="Website SunriseVietnam">Website SunriseVietnam</option>
                                <option value="Cốc Cốc">Cốc Cốc</option>
                                <option value="Truyền hình Hải Phòng">Truyền hình Hải Phòng</option>
                                <option value="Email">Email</option>
                                <option value="Google">Google</option>
                                <option value="Băng rôn">Băng rôn</option>
                                <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                                <option value="CLB trong trường">CLB trong trường</option>
                                <option value="Dân trí">Dân trí</option>
                                <option value="Zing News">Zing News</option>
                                <option value="VnExpress">VnExpress</option>
                                <option value="Kênh khác">Khác</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-md-4 col-md-offset-4 ${styles.marginBottomXS} ${styles.marginBottomSM} ${styles.marginBottomMD}`}>
                            <select
                                className="form-control selectpicker" title="Bạn có muốn được tư vấn về lộ trình học IELTS"
                                {...this._handleChange('consult')}>
                                <option value="Có tư vấn">Có</option>
                                <option value="Không tư vấn">Không</option>
                            </select>
                        </div>
                        <div className="col-xs-12">
                            <button disabled={!this._isFormValid} className={`${styles.btnBlock}`}
                                    id={`${styles.btnRegister}`} type="button"
                                    onClick={this._registerSubmit}><h2>ĐĂNG KÝ</h2>
                            </button>
                            <a id="teachers">
                                <div className={`hidden-xs ${styles.mediumSpacing}`}></div>
                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </a>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

class SpecialForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.clone(_formObj);
        this._handleChange = this._handleChange.bind(this);
        this._handleMultiChange = this._handleMultiChange.bind(this);
        this._isFormValid = this._isFormValid.bind(this);
        this._registerSubmit = this._registerSubmit.bind(this);
    }

    componentDidMount() {
        $('.selectpicker').selectpicker();
    }

    _isFormValid() {
        let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (this.state.fullName && regEmail.test(this.state.email) && this.state.tel && this.state.identity && this.state.city && this.state.study && this.state.aim && this.state.testTime && this.state.knownBy.length > 0);
    }

    _registerSubmit() {
        if (this._isFormValid()) {
            this.props.onRegister(this.state)
        }
    }

    _handleChange = (key) => ({
        value: this.state[key],
        onChange: e => {
            this.setState({[key]: e.target.value})
        }
    });

    _handleMultiChange = (key) => ({
        onChange: e => {
            let newValue = this.state[key];
            const selectedValue = e.target.value;
            if (e.target.checked) {
                newValue = _.union(newValue, [selectedValue])
            } else {
                newValue = _.without(newValue, selectedValue)
            }
            this.setState({[key]: newValue})
        }

    });

    render() {
        const knownBy_ar = ["Facebook SunriseVietnam", "Website SunriseVietnam", "Truyền hình Hải Phòng", "Email", "Google", "Băng rôn", "Bạn bè giới thiệu", "CLB trong trường", "Dân trí", "Zing News", "VnExpress", "Kênh khác"]
        return (
            <div className="col-xs-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className={`col-xs-12 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Họ và tên" {...this._handleChange('fullName')}/>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <input className={`form-control ${styles.customInput}`}
                                   placeholder="Số điện thoại"  {...this._handleChange('tel')}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Email"  {...this._handleChange('email')}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select
                                className={`form-control ${styles.customInput}`} {...this._handleChange('identity')}>
                                <option disabled>Bạn là</option>
                                <option value="Học sinh Tiểu học">Học sinh tiểu học</option>
                                <option value="Học sinh THCS">Học sinh THCS</option>
                                <option value="Học sinh THPT">Học sinh THPT</option>
                                <option value="Sinh viên Đại học">Sinh viên đại học</option>
                                <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                                <option value="Phụ huynh">Phụ huynh</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select className={`form-control ${styles.customInput}`}
                                {...this._handleChange('city')}>
                                <option disabled>Nơi bạn đang sống</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="TP HCM">TP Hồ Chí Minh</option>
                                <option value="Hải Phòng">Hải Phòng</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="Cần Thơ">Cần Thơ</option>
                                <option value="An Giang">An Giang</option>
                                <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                <option value="Bắc Giang">Bắc Giang</option>
                                <option value="Bắc Kạn">Bắc Kạn</option>
                                <option value="Bạc Liêu">Bạc Liêu</option>
                                <option value="Bắc Ninh">Bắc Ninh</option>
                                <option value="Bến Tre">Bến Tre</option>
                                <option value="Bình Định">Bình Định</option>
                                <option value="Bình Dương">Bình Dương</option>
                                <option value="Bình Phước">Bình Phước</option>
                                <option value="Bình Thuận">Bình Thuận</option>
                                <option value="Cà Mau">Cà Mau</option>
                                <option value="Cao Bằng">Cao Bằng</option>
                                <option value="Đắk Lắk">Đắk Lắk</option>
                                <option value="Đắk Nông">Đắk Nông</option>
                                <option value="Điện Biên">Điện Biên</option>
                                <option value="Đồng Nai">Đồng Nai</option>
                                <option value="Đồng Tháp">Đồng Tháp</option>
                                <option value="Gia Lai">Gia Lai</option>
                                <option value="Hà Giang">Hà Giang</option>
                                <option value="Hà Nam">Hà Nam</option>
                                <option value="Hà Tĩnh">Hà Tĩnh</option>
                                <option value="Hải Dương">Hải Dương</option>
                                <option value="Hậu Giang">Hậu Giang</option>
                                <option value="Hòa Bình">Hòa Bình</option>
                                <option value="Hưng Yên">Hưng Yên</option>
                                <option value="Khánh Hòa">Khánh Hòa</option>
                                <option value="Kiên Giang">Kiên Giang</option>
                                <option value="Kon Tum">Kon Tum</option>
                                <option value="Lai Châu">Lai Châu</option>
                                <option value="Lâm Đồng">Lâm Đồng</option>
                                <option value="Lạng Sơn">Lạng Sơn</option>
                                <option value="Lào Cai">Lào Cai</option>
                                <option value="Long An">Long An</option>
                                <option value="Nam Định">Nam Định</option>
                                <option value="Nghệ An">Nghệ An</option>
                                <option value="Ninh Bình">Ninh Bình</option>
                                <option value="Ninh Thuận">Ninh Thuận</option>
                                <option value="Phú Thọ">Phú Thọ</option>
                                <option value="Phú Yên">Phú Yên</option>
                                <option value="Quảng Bình">Quảng Bình</option>
                                <option value="Quảng Nam">Quảng Nam</option>
                                <option value="Quảng Ngãi">Quảng Ngãi</option>
                                <option value="Quảng Ninh">Quảng Ninh</option>
                                <option value="Quảng Trị">Quảng Trị</option>
                                <option value="Sóc Trăng">Sóc Trăng</option>
                                <option value="Sơn La">Sơn La</option>
                                <option value="Tây Ninh">Tây Ninh</option>
                                <option value="Thái Bình">Thái Bình</option>
                                <option value="Thái Nguyên">Thái Nguyên</option>
                                <option value="Thanh Hóa">Thanh Hóa</option>
                                <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                <option value="Tiền Giang">Tiền Giang</option>
                                <option value="Trà Vinh">Trà Vinh</option>
                                <option value="Tuyên Quang">Tuyên Quang</option>
                                <option value="Vĩnh Long">Vĩnh Long</option>
                                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                <option value="Yên Bái">Yên Bái</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}  ${styles.marginBottomMD}`}>
                            <select className={`form-control ${styles.customInput}`}
                                    {...this._handleChange('study')}>
                                <option disabled>Bạn có nhu cầu học</option>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="SAT">SAT</option>
                                <option value="GMAT">GMAT</option>
                                <option value="Không">Không</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select className={`form-control ${styles.customInput}`}
                                    {...this._handleChange('aim')}>
                                <option disabled>Mục đích bạn học IELTS</option>
                                <option value="Để tốt nghiệp">Để tốt nghiệp</option>
                                <option value="Đi du học">Đi du học</option>
                                <option value="Công việc trong nước">Công việc trong nước</option>
                                <option value="Mục đích khác">Mục đích khác</option>
                            </select>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select className={`form-control ${styles.customInput}`}
                                {...this._handleChange('testTime')}>
                                <option disabled>Thời gian dự định du học</option>
                                <option value="TT Năm 2017">Năm 2017</option>
                                <option value="TT Năm 2018">Năm 2018</option>
                                <option value="TT Năm 2019">Năm 2019</option>
                                <option value="TT Năm 2020">Năm 2020</option>
                                <option value="Chưa có dự định thi">Chưa có dự định thi</option>
                            </select>
                        </div>

                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM} ${styles.marginBottomMD}`}>
                            <div className={`row ${styles.customCheckbox}`}>
                                <label className="col-xs-12">Bạn biết chương trình này qua</label>
                                {knownBy_ar.map((dht) => {
                                    const self = this;
                                    return <div className="checkbox col-xs-12">
                                        <label key={dht}><input type="checkbox"
                                                                value={dht} {...self._handleMultiChange('knownBy')}/>{dht}
                                        </label>
                                    </div>
                                })}

                            </div>
                        </div>
                        <div className={`col-xs-12 col-md-4 col-md-offset-4 ${styles.marginBottomXS} ${styles.marginBottomSM} ${styles.marginBottomMD}`}>
                            <select
                                className={`form-control ${styles.customInput}`}
                                {...this._handleChange('consult')}>
                                <option disabled>Bạn có muốn được tư vấn về lộ trình học IELTS</option>
                                <option value="Có tư vấn">Có</option>
                                <option value="Không tư vấn">Không</option>
                            </select>
                        </div>
                        <div className="col-xs-12">
                            <div className={styles.smallSpacing}></div>
                            <button disabled={!this._isFormValid} className={`${styles.btnBlock}`}
                                    id={`${styles.btnRegister}`} type="button"
                                    onClick={this._registerSubmit}><h2>ĐĂNG KÝ</h2>
                            </button>
                            <a id="teachers">
                                <div className={`hidden-xs ${styles.mediumSpacing}`}></div>
                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const Header = React.createClass({
    displayName: 'Header',
    componentDidMount(){
        $(window).scroll(function () {
            if ($(window).scrollTop() > 73) {
                $('.menu').css({
                    position: 'fixed',
                    top: '0px',
                    width: '100%'
                });
            } else {
                $('.menu').css({
                    position: 'static',
                    top: '0px'
                });
            }
        });
    },
    render(){
        return <nav className={`navbar navbar-fixed-top ${styles.navBarCustom}`}>
            <div className="container">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#top-menu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand visible-xs" href="#"><img src={require('../../photos/small-logo.png')} className="img-responsive"/></a>
                        <a className="navbar-brand hidden-xs" href="#"><img width="125" src={require('../../photos/logo.png')}/></a>
                    </div>
                    <div className={`collapse navbar-collapse text-center ${styles.centerMenu}`} id="top-menu">
                        <ul className="nav navbar-nav">
                            <li><Link to="/" id="menuHome" className={styles.customA}>TRANG CHỦ</Link></li>
                            <li><Link to="/" hash="#registerForm" className={`visible-xs ${styles.customA}`}>ĐĂNG KÝ
                                THAM DỰ</Link></li>
                            <li><Link to="/" id="menuTeachers" hash="#teachers" className={styles.customA}>GIẢNG VIÊN<br
                                className="hidden-xs hidden-lg"/>  CHƯƠNG TRÌNH</Link>
                            </li>
                            <li><Link to="/" id="menuOpportunities" hash="#opportunities" className={styles.customA}>CƠ HỘI KHI<br
                                className="hidden-xs hidden-lg"/> THAM GIA</Link></li>
                            <li><Link to="/" id="menuSharing" hash="#sharing" className={styles.customA}>DU HỌC SINH<br
                                className="hidden-xs hidden-lg"/> CHIA SẺ</Link></li>
                            <li><Link to="/" id="menuInfo" hash="#info" className={styles.customA}>THÔNG TIN VỀ<br
                                className="hidden-xs hidden-lg"/> CHỨNG CHỈ IELTS</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    }
});

class Main extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const nua = navigator.userAgent;
        const is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
        const displayForm = (is_android) ? <SpecialForm onRegister={this.props.onRegister}/> :
            <DefaultForm onRegister={this.props.onRegister}/>
        return<div>
            {/*----------------------banner----------------------*/}
            <div className={`${styles.banner}`}>
                <img className="hidden-xs" src={require('../../photos/banner.png')} width="100%"/>
                <img className="visible-xs" src={require('../../photos/small-banner.png')} width="100%"/>
            </div>
            {/*----------------------places----------------------*/}
            <a id="places" className="visible-xs">
            </a>
            <div className="container">
                <div className="col-xs-12 col-md-10 col-md-offset-1 text-center">
                    <div className={`visible-xs ${styles.smallSpacing}`}></div>
                    <div className={`hidden-xs ${styles.mediumSpacing}`}></div>
                    <hr className={styles.hrTitle}/>
                    <h2 className={`${styles.brown} ${styles.semiBold}`}>CHÚNG TÔI HIỆN ĐANG TUYỂN SINH LỚP HỌC IELTS TẠI 2 CƠ SỞ TRÊN ĐỊA BÀN HÀ NỘI</h2>
                    <div className={styles.smallSpacing}></div>
                </div>
                <div className="col-xs-12 col-sm-6 module">
                    <h3 className={`${styles.boldIt}`}><i>* SUNRISE VIETNAM TẠI CỬA BẮC</i></h3>
                    <p>Địa chỉ: Số 86 Cửa Bắc, Ba Đình, Hà Nội</p>
                    <p>SĐT: 043 722 4878</p>
                </div>
                <div className="col-xs-12 col-sm-6 module">
                    <h3 className={`${styles.boldIt}`}><i>* SUNRISE VIETNAM TẠI TIMES CITY</i></h3>
                    <p>Địa chỉ: Tầng 2 khu văn phòng tòa nhà T5, Times City, 458 Minh Khai, Hai Bà Trưng, Hà Nội</p>
                    <p>SĐT: 043 204 8333</p>
                </div>
                <div className={`col-xs-12`}>
                    <a id="registerForm">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                    </a>
                    <div className={`hidden-xs ${styles.largeSpacing}`}></div>
                </div>
            </div>
            {/*----------------------form----------------------*/}
            <div className={styles.orangeBg}>
                <div className={`container ${styles.noPadding}`}>
                    <div className={`col-xs-12 text-center ${styles.sectionTitle}`}>
                        <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                        <h2 className={`${styles.white}`}>ĐĂNG KÝ NHẬN TƯ VẤN KHÓA HỌC VÀ NHẬN TÀI LIỆU IELTS</h2>
                        <p className={`${styles.white}`}><i>Xin nhập/điền đầy đủ thông tin</i></p>
                    </div>
                    {displayForm}
                </div>
            </div>
            {/*----------------------teachers----------------------*/}
            <div className={styles.teachersContainer}>
                <div className={`container ${styles.noPadding}`}>
                    <div className={`col-xs-12 col-md-10 col-md-offset-1 text-center ${styles.sectionTitle}`}>
                        <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                        <hr className={`${styles.hrTitle}`}/>
                        <h2 className={`${styles.brown} ${styles.bold}`}>GIẢNG VIÊN CỦA CHƯƠNG TRÌNH</h2>
                        <div className={`${styles.smallSpacing}`}></div>
                        <p className={`${styles.brown} ${styles.semiBold}`}>Đội ngũ chuyên môn của Sunrise Vietnam với những giảng viên 8.0-8.5 IELTS, có chứng chỉ sư phạm quốc tế TESOL, CELTA và nhiều năm kinh nghiệm giảng dạy rất vui lòng được đồng hành cùng bạn trên con đường chinh phục IELTS.</p>
                    </div>
                    <div className="col-xs-12 col-sm-4 text-center">
                        <img className="img-responsive hidden-xs hidden-sm" src={require('../../photos/teacher-1.png')} width="100%"/>
                        <img className="img-responsive visible-xs visible-sm center-block" src={require('../../photos/teacher-1.png')} height="50%"/>
                        <h3 className={`${styles.semiBold}`}>TRẦN NGUYÊN NGỌC</h3>
                    </div>
                    <div className="col-xs-12 col-sm-4 text-center">
                        <img className="img-responsive hidden-xs hidden-sm" src={require('../../photos/teacher-2.png')} width="100%"/>
                        <img className="img-responsive visible-xs visible-sm center-block" src={require('../../photos/teacher-2.png')} height="50%"/>
                        <h3 className={`${styles.semiBold}`}>VŨ THÙY ANH</h3>
                    </div>
                    <div className="col-xs-12 col-sm-4 text-center">
                        <img className="img-responsive hidden-xs hidden-sm" src={require('../../photos/teacher-3.png')} width="100%"/>
                        <img className="img-responsive visible-xs visible-sm center-block" src={require('../../photos/teacher-3.png')} height="50%"/>
                        <h3 className={`${styles.semiBold}`}>MARTA BORAGANLI</h3>
                    </div>
                </div>
                <a id="opportunities">
                    <div className={`visible-xs ${styles.smallSpacing}`}></div>
                    <div className={`hidden-xs ${styles.largeSpacing}`}></div>
                </a>
            </div>
            {/*----------------------opportunities----------------------*/}
            <div className={styles.orangeBg}>
                <div className="container">
                    <div className={`col-xs-12 col-md-10 col-md-offset-1 text-center ${styles.sectionTitle} ${styles.noPadding}`}>
                        <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                        <hr className={`${styles.hrTitle}`}/>
                        <h2 className={`${styles.brown} ${styles.bold}`}>CƠ HỘI DÀNH CHO BẠN KHI THAM GIA CÁC KHÓA HỌC TẠI SUNRISE VIETNAM</h2>
                    </div>
                </div>
                <a id="sharing">
                    <div className={styles.mediumSpacing}></div>
                </a>
            </div>
            {/*----------------------sharing----------------------*/}
            <div className="container">
                <div className={`col-xs-12 col-md-10 col-md-offset-1 text-center ${styles.sectionTitle}`}>
                    <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                    <hr className={`${styles.hrTitle}`}/>
                    <h2 className={`${styles.brown} ${styles.bold}`}>DU HỌC SINH CHIA SẺ</h2>
                    <div className={`${styles.smallSpacing}`}></div>
                </div>
                <div className="hidden-xs hidden-sm col-md-4">
                    <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer1}`}>
                        <div className={`col-xs-12 ${styles.imgMainContent}`}>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Luyện thi IELTS phải trau dồi cả 4 kỹ năng nghe, nói, đọc, viết và các giáo viên tại Sunrise Vietnam dạy phần nào cũng dễ hiểu. Học tại Sunrise khiến em thích tiếng Anh hơn và được điểm tuyệt đối 9.0 điểm bài IELTS READING.<br/><a className={`${styles.white}`} target="_blank" href="http://sunrise.edu.vn/ielts/pham-ngoc-hai-dat-diem-tuyet-doi-9-0-ielts-reading-2/"><i>Xem thêm</i></a></p>
                        </div>
                    </div>
                    <div className={`col-xs-12 ${styles.lgreenBg} ${styles.marginBottomMD}`}>
                        <h3 className={`${styles.white}`}>PHẠM NGỌC HẢI</h3>
                        <hr className={`${styles.hrCustom} ${styles.grayBg} `}/>
                        <h5 className={`${styles.white}`}>7.5 IELTS OVERALL<br/>(9.0 READING, 8.0 LISTENING)<br/><br/></h5>
                    </div>
                </div>
                <div className="hidden-xs hidden-sm col-md-4">
                    <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer2}`}>
                        <div className={`col-xs-12 ${styles.imgMainContent}`}>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Ở Sunrise Vietnam mỗi giáo viên một cách giảng nhưng đều tâm lí với bọn mình vô cùng, giảng tận tình mà đi sâu từng vấn đề. Sau khoá học cùng các chị, mình học nhiều kiến thức rất bổ ích không chỉ các tips về IELTS mà còn kiến thức xã hội. Vì vậy, mình vô cùng cảm ơn các chị cũng như trung tâm Sunrise đã giúp đỡ và dạy bọn mình đến ngày hôm nay. Mình rất hi vọng sẽ còn được tiếp tục học tại trung tâm trong thời gian tới.<br/><a className={`${styles.white}`} target="_blank" href="http://sunrise.edu.vn/ielts/phuong-phap-chinh-phuc-giam-khao-ielts-speaking-2/"><i>Xem thêm</i></a></p>
                        </div>
                    </div>
                    <div className={`col-xs-12 ${styles.yellowBg} ${styles.marginBottomMD}`}>
                        <h3>NGUYỄN LINH CHI</h3>
                        <hr className={`${styles.hrCustom} ${styles.blackBg} ${styles.captionCustom}`}/>
                        <h5>Sinh viên chuyên ngành Quản trị Kinh doanh thuộc khoa Đào tạo Quốc tế trường Đại học Ngoại Thương</h5>
                    </div>
                </div>
                <div className="hidden-xs hidden-sm col-md-4">
                    <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer3}`}>
                        <div className={`col-xs-12 ${styles.imgMainContent}`}>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Cách giảng dạy của Sunrise Vietnam chính là chìa khoá quan trọng giúp em có được kết quả hơn cả mong đợi. Chương trình dạy dễ hiểu và không dàn trải bài để kéo dài thời gian học. Với Sunrise Vietnam, chỉ học trong thời gian ngắn mà có thể vượt mục tiêu. Nếu ai hỏi em có tiếc nuối gì không thì em sẽ không ngại ngần và trả lời: Em tiếc vì không biết Sunrise sớm hơn mà thôi.<br/><a className={`${styles.white}`} target="_blank" href="http://sunrise.edu.vn/ielts/bi-quyet-dat-diem-ielts-vuot-muc-tieu-2/"><i>Xem thêm</i></a></p>
                        </div>
                    </div>
                    <div className={`col-xs-12 ${styles.lblueBg} ${styles.marginBottomMD}`}>
                        <h3 className={`${styles.white}`}>VŨ HƯƠNG LỘC</h3>
                        <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                        <h5 className={`${styles.white}`}>Sinh viên chuyên ngành Quản trị Kinh doanh thuộc khoa Đào tạo Quốc tế trường Đại học Ngoại Thương</h5>
                    </div>
                </div>
                <div className="hidden-xs hidden-sm col-md-12">
                    <div className={`${styles.mediumSpacing}`}></div>
                </div>
                <div className="hidden-xs hidden-sm col-md-4">
                    <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer4}`}>
                        <div className={`col-xs-12 ${styles.imgMainContent}`}>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Tuy có những khoảng thời gian áp lực do thời gian gấp gáp, điều kiện đi lại, đôi khi bản thân mình thấy nản lòng nhưng chính nhờ sự tiến bộ của bản thân - thành quả của thầy, trò và đội ngũ Sunrise đã tiếp thêm động lực cho mình.<br/><a className={`${styles.white}`} target="_blank" href="https://www.facebook.com/hoctienganh.sunrisevietnam/photos/a.1421716074796442.1073741860.1382684888699561/1421413151493401/?type=3&theater"><i>Xem thêm</i></a></p>
                        </div>
                    </div>
                    <div className={`col-xs-12 ${styles.yellowBg}`}>
                        <h3>NHẬT DƯƠNG</h3>
                        <hr className={`${styles.hrCustom} ${styles.blackBg} ${styles.captionCustom}`}/>
                        <h5><br/></h5>
                    </div>
                </div>
                <div className="hidden-xs hidden-sm col-md-4">
                    <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer5}`}>
                        <div className={`col-xs-12 ${styles.imgMainContent}`}>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Về cả 3 giáo viên của Sunrise Vietnam mà em từng học thì có thể nói là đáng yêu, dễ thương, nhiệt tình cực kỳ ý. Em thích học IELTS ở đây vì em cảm thấy Sunrise làm cho em có cảm giác IELTS dễ đi hẳn, học thì thoải mái, không bị áp lực mệt mỏi như mọi người vẫn tả.</p>
                        </div>
                    </div>
                    <div className={`col-xs-12 ${styles.lblueBg}`}>
                        <h3 className={`${styles.white}`}>NGUYỄN HOÀNG ANH</h3>
                        <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                        <h5 className={`${styles.white} ${styles.captionCustom}`}>THPT Phan Đình Phùng- 6.5 IELTS</h5>
                    </div>
                </div>
                <div className="hidden-xs hidden-sm col-md-4">
                    <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer6}`}>
                        <div className={`col-xs-12 ${styles.imgMainContent}`}>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Em thấy mình rất may mắn khi được theo học tại Sunrise, chắc là do có duyên ^^ em đã được học từ 3 chị giảng viên và đều dạy rất hay, em rất thích. Em đã từng học khá kém và sau 2 tháng phần đọc của em đã tăng được 1.5 điểm khiến giáo viên của em rất vui.</p>
                        </div>
                    </div>
                    <div className={`col-xs-12 ${styles.lgreenBg}`}>
                        <h3 className={`${styles.white}`}>NGUYỄN QUỲNH TRÂM</h3>
                        <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                        <h5 className={`${styles.white} ${styles.captionCustom}`}>THPT Phan Đình Phùng - 6.5 IELTS</h5>
                    </div>
                </div>
                {/*-------sharing - mobile-------*/}
                <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                    <div className="row">
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.imgMainContainer} ${styles.imgContainer1}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.lgreenBg}`}>
                            <h3 className={`${styles.white} ${styles.semiBold}`}>PHẠM NGỌC HẢI</h3>
                            <p className={`${styles.white}`}>7.5 IELTS Overall<br/>(9.0 Reading, 8.0 Listening)</p>
                            <hr className={`${styles.hrCustom} ${styles.grayBg}`}/>
                            <p><i>Luyện thi IELTS phải trau dồi cả 4 kỹ năng nghe, nói, đọc, viết và các giáo viên tại Sunrise Vietnam dạy phần nào cũng dễ hiểu. Học tại Sunrise khiến em thích tiếng Anh hơn và được điểm tuyệt đối 9.0 điểm bài IELTS READING.</i><br/><a className={`${styles.white}`} target="_blank" href="http://sunrise.edu.vn/ielts/pham-ngoc-hai-dat-diem-tuyet-doi-9-0-ielts-reading-2/"><i>Xem thêm</i></a></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`visible-xs visible-sm ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.imgMainContainer} ${styles.imgContainer5}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.yellowBg}`}>
                            <h3 className={`${styles.semiBold}`}>NGUYỄN HOÀNG ANH</h3>
                            <p>THPT Phan Đình Phùng - 6.5 IELTS</p>
                            <hr className={`${styles.hrCustom} ${styles.blackBg}`}/>
                            <p><i>Về cả 3 giáo viên của Sunrise Vietnam mà em từng học thì có thể nói là đáng yêu, dễ thương, nhiệt tình cực kỳ ý. Em thích học IELTS ở đây vì em cảm thấy Sunrise làm cho em có cảm giác IELTS dễ đi hẳn, học thì thoải mái, không bị áp lực mệt mỏi như mọi người vẫn tả.</i></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`visible-xs visible-sm ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer3}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.lblueBg}`}>
                            <h3 className={`${styles.white} ${styles.semiBold}`}>VŨ HƯƠNG LỘC</h3>
                            <p className={`${styles.white}`}>Sinh viên chuyên ngành Quản trị Kinh doanh thuộc khoa Đào tạo Quốc tế trường Đại học Ngoại Thương</p>
                            <hr className={`${styles.hrCustom} ${styles.grayBg}`}/>
                            <p><i>Cách giảng dạy của Sunrise Vietnam chính là chìa khoá quan trọng giúp em có được kết quả hơn cả mong đợi. Chương trình dạy dễ hiểu và không dàn trải bài để kéo dài thời gian học. Với Sunrise Vietnam, chỉ học trong thời gian ngắn mà có thể vượt mục tiêu. Nếu ai hỏi em có tiếc nuối gì không thì em sẽ không ngại ngần và trả lời: Em tiếc vì không biết Sunrise sớm hơn mà thôi.<br/><a className={`${styles.white}`} target="_blank" href="http://sunrise.edu.vn/ielts/bi-quyet-dat-diem-ielts-vuot-muc-tieu-2/"><i>Xem thêm</i></a></i></p>
                        </div>
                    </div>
                </div>
                <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                    <div className="row">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.imgMainContainer} ${styles.imgContainer4}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.lgreenBg}`}>
                            <h3 className={`${styles.white} ${styles.semiBold}`}>NHẬT DƯƠNG</h3>
                            <hr className={`${styles.hrCustom} ${styles.grayBg}`}/>
                            <p><i>Tuy có những khoảng thời gian áp lực do thời gian gấp gáp, điều kiện đi lại, đôi khi bản thân mình thấy nản lòng nhưng chính nhờ sự tiến bộ của bản thân - thành quả của thầy, trò và đội ngũ Sunrise đã tiếp thêm động lực cho mình.<br/><a className={`${styles.white}`} target="_blank" href="https://www.facebook.com/hoctienganh.sunrisevietnam/photos/a.1421716074796442.1073741860.1382684888699561/1421413151493401/?type=3&theater"><i>Xem thêm</i></a></i></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`visible-xs visible-sm ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer2}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.yellowBg}`}>
                            <h3 className={`${styles.semiBold}`}>NGUYỄN LINH CHI</h3>
                            <p>Sinh viên chuyên ngành Quản trị Kinh doanh thuộc khoa Đào tạo Quốc tế trường Đại học Ngoại Thương</p>
                            <hr className={`${styles.hrCustom} ${styles.blackBg}`}/>
                            <p><i>Ở Sunrise Vietnam mỗi giáo viên một cách giảng nhưng đều tâm lí với bọn mình vô cùng, giảng tận tình mà đi sâu từng vấn đề. Sau khoá học cùng các chị, mình học nhiều kiến thức rất bổ ích không chỉ các tips về IELTS mà còn kiến thức xã hội. Vì vậy, mình vô cùng cảm ơn các chị cũng như trung tâm Sunrise đã giúp đỡ và dạy bọn mình đến ngày hôm nay. Mình rất hi vọng sẽ còn được tiếp tục học tại trung tâm trong thời gian tới.<br/><a className={`${styles.white}`} target="_blank" href="http://sunrise.edu.vn/ielts/phuong-phap-chinh-phuc-giam-khao-ielts-speaking-2/"><i>Xem thêm</i></a></i></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`visible-xs visible-sm ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.imgMainContainer} ${styles.imgContainer6}`}></div>
                        <div className={`col-xs-12 ${styles.borderHorizontal} ${styles.lblueBg}`}>
                            <h3 className={`${styles.white} ${styles.semiBold}`}>NGUYỄN QUỲNH TRÂM</h3>
                            <p className={`${styles.white}`}>THPT Phan Đình Phùng - 6.5 IELTS</p>
                            <hr className={`${styles.hrCustom} ${styles.grayBg}`}/>
                            <p><i>Em thấy mình rất may mắn khi được theo học tại Sunrise, chắc là do có duyên ^^ em đã được học từ 3 chị giảng viên và đều dạy rất hay, em rất thích. Em đã từng học khá kém và sau 2 tháng phần đọc của em đã tăng được 1.5 điểm khiến giáo viên của em rất vui.</i></p>
                        </div>
                    </div>


                </div>
            </div>
            {/*----------------------info----------------------*/}
            <a id="info">
                <div className={`hidden-xs ${styles.largeSpacing}`}></div>
                <div className={`visible-xs ${styles.mediumSpacing}`}></div>
            </a>
            <div className={styles.bblackBg}>
                <div className="container">
                    <div className="col-xs-12 text-center">
                        <div className={styles.mediumSpacing}></div>
                        <h2 className={`${styles.white} ${styles.bold}`}><span className="hidden-xs glyphicon glyphicon-chevron-right"> </span><span className="hidden-xs glyphicon glyphicon-chevron-right"> </span> <a className={`${styles.white}`} target="_blank" href="http://sunrise.edu.vn/luyen-thi-ielts/gioi-thieu-ve-ielts/">THÔNG TIN VỀ CHỨNG CHỈ IELTS</a> <span className="hidden-xs glyphicon glyphicon-chevron-left"> </span><span className="hidden-xs glyphicon glyphicon-chevron-left"> </span></h2>
                        <div className={styles.mediumSpacing}></div>
                    </div>
                </div>
            </div>
            <CallButton/>
        </div>
    }
}

const Footer = React.createClass({
    displayName: 'Footer',
    render(){
        return (
        <div className={styles.footer}>
                <div className="container">
                    <div className={styles.smallSpacing}></div>
                    <div className="col-xs-12">
                        <h3 className="text-center"><strong>SUNRISE VIETNAM 15 NĂM TƯ VẤN DU HỌC - ĐÀO TẠO NGOẠI NGỮ</strong></h3>
                        <h3 className="text-center"><strong>MỌI CHI TIẾT XIN LIÊN HỆ</strong></h3>
                        <div className={styles.smallSpacing}></div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.orange}>HÀ NỘI:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" height="13px" src={require('../../photos/place.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">86 CỬA BẮC, Q. BA ĐÌNH</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <img className="media-object" width="14px"
                                         src={require('../../photos/phone.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">043 722 4898</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.orange}>TIMES CITY:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" height="13px" src={require('../../photos/place.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">TẦNG 2 TOÀ NHÀ T5, <br className="visible-lg"/>
                                        KHU VĂN PHÒNG TIMES CITY, <br className="visible-lg"/>
                                        458 MINH KHAI, Q. HAI BÀ TRƯNG, HÀ NỘI</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <img className="media-object" width="14px"
                                         src={require('../../photos/phone.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">043 200 4743 * 043 204 8333</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.orange}>HỒ CHÍ MINH:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" height="13px" src={require('../../photos/place.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">LẦU 7, TOÀ NHÀ THANH DUNG, <br className="visible-lg"/>
                                        179 NGUYỄN CƯ TRINH, QUẬN 1</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <img className="media-object" width="14px"
                                         src={require('../../photos/phone.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">083 837 0226</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.orange}>HẢI PHÒNG:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" height="13px" src={require('../../photos/place.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">29 NGUYỄN TRÃI, NGÔ QUYỀN</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <img className="media-object" width="14px"
                                         src={require('../../photos/phone.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">031 365 3269</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 text-center">
                        <div className={styles.smallSpacing}></div>
                        <p>
                            <span className={styles.lblue}>WEBSITE:</span> SUNRISEVIETNAM.COM
                            <span className="hidden-xs hidden-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><br
                            className="hidden-md hidden-lg"/>
                            <span className={styles.lblue}>EMAIL:</span> INFO@SUNRISEVIETNAM.COM<span
                            className="hidden-xs hidden-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><br
                            className="hidden-md hidden-lg"/>
                            <span className={styles.lblue}>FACEBOOK:</span> WWW.FACEBOOK.COM/THAIDUONG.VIETNAM
                        </p>

                        <div className={styles.smallSpacing}></div>
                    </div>
                </div>
            </div>
        )
    }
});

const CallButton = React.createClass({
	handleClickPhone(e){
		e.preventDefault();
		window.location.hash = '';
		window.location.hash = '#registerForm';
		if(ga){
			ga('send', 'event', 'Click', 'Call button');
		}
	},
    render(){
        return (<div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show hidden-xs" id="coccoc-alo-phoneIcon"
                     style={{"right": "0px", "display": "block"}}>
            {/*<div className="coccoc-alo-ph-circle"></div>*/}
            {/*<div className="coccoc-alo-ph-circle-fill"></div>*/}
            <div className="coccoc-alo-ph-img-circle"  onClick={this.handleClickPhone}></div>
        </div>)
    }
});