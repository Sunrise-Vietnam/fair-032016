import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import DDP from 'ddp.js';
import styles from '../../main1703.scss';
import Slider from 'react-slick';

import WorldMap from '../elements/Map'

const _formObj = {
    hovaten: '',
    sodienthoai: '',
    email: '',
    nguoidangkyla: '',
    thanhphodangsong: '',
    thamdutai: '',
    duhoctai: [],
    thoigianduhoc: '',
    nhucauhoc: '',
    bietchuongtrinhquakenh: []
};

const _eventCode = 'c247s94j6ZwDxI4';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this._saveAndThankYou = this._saveAndThankYou.bind(this);
    }

    componentDidMount() {
        let options = {
            endpoint: "ws://system.sunrisevietnam.com/websocket",
            SocketConstructor: WebSocket
        };
        this.ddp = new DDP(options);
        this.ddp.on("connected", function () {
            console.info("Connected to Server...");
        });
        (function ($) {
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

            $.fn.visible = function (partial) {

                var $t = $(this),
                    $w = $(window),
                    viewTop = $w.scrollTop(),
                    viewBottom = viewTop + $w.height(),
                    _top = $t.offset().top,
                    _bottom = _top + $t.height(),
                    compareTop = partial === true ? _bottom : _top,
                    compareBottom = partial === true ? _top : _bottom;

                return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

            };

        })(jQuery);

        setTimeout(function () {
            var win = $(window);

            var allMods = $(".module");

            allMods.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("already-visible");
                }
            });

            win.scroll(function (event) {

                allMods.each(function (i, el) {
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
            const msgId = this.ddp.method('registerEventGLVH', [_eventCode, obj]);
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

const LeftNavButton = React.createClass({
    render() {
        return (
            <img {...this.props} src={require('../../photos/201609/Arrow_L.png')}/>
        )
    }
});

const RightNavButton = React.createClass({
    render() {
        return (
            <img {...this.props} src={require('../../photos/201609/Arrow_R.png')}/>
        )
    }
});

class DefaultForm extends React.Component {
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
        return (this.state.hovaten && regEmail.test(this.state.email) && this.state.sodienthoai && this.state.thamdutai && this.state.duhoctai && this.state.nguoidangkyla && this.state.thanhphodangsong && this.state.thoigianduhoc && this.state.nhucauhoc && this.state.duhoctai.length > 0 && this.state.bietchuongtrinhquakenh.length > 0);
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
            <div className="container">
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className={`col-xs-12 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Họ và tên" {...this._handleChange('hovaten')}/>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <input className={`form-control ${styles.customInput}`}
                                   placeholder="Số điện thoại"  {...this._handleChange('sodienthoai')}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Email"  {...this._handleChange('email')}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <select className={`form-control selectpicker ${styles.customSelect}`}
                                    title="Bạn sẽ tham dự sự kiện tại" {...this._handleChange('thamdutai')}
                                    mobile="true">
                                <option value="Hà Nội">Hà Nội, 13:00 - 14:00, Chủ nhật, ngày 04/03/2018, tại KS
                                    MOVENPICK
                                </option>
                                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh, 13:00 - 14:00, Thứ 7, ngày 03/03/2018,
                                    tại ÉN TEA HOUSE & RESTAURANT
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select className={`form-control selectpicker ${styles.customSelect}`}
                                    title="Bạn là" {...this._handleChange('nguoidangkyla')}>
                                <option value="Học sinh THCS">Học sinh THCS</option>
                                <option value="Học sinh THPT">Học sinh THPT</option>
                                <option value="Sinh viên Đại học">Sinh viên Đại học</option>
                                <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                                <option value="Phụ huynh">Phụ huynh</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select className={`form-control selectpicker ${styles.customSelect}`}
                                    title="Nơi bạn đang sống" data-size="8"
                                    {...this._handleChange('thanhphodangsong')}>
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
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomMD}`}>
                            <select className={`form-control selectpicker ${styles.customSelect}`} multiple
                                    title="Bạn dự định du học tại (có thể chọn nhiều)"
                                    data-selected-text-format="count>3" data-size="8"
                                    {...this._handleMultiChange('duhoctai')}>
                                <option value="Anh">Anh</option>
                                <option value="Mỹ">Mỹ</option>
                                <option value="Canada">Canada</option>
                                <option value="Úc">Úc</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Phần Lan">Phần Lan</option>
                                <option value="Thụy Sỹ">Thụy Sỹ</option>
                                <option value="Hà Lan">Hà Lan</option>
                                <option value="Đức">Đức</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Thái Lan">Thái Lan</option>
                                <option value="Hàn Quốc">Hàn Quốc</option>
                                <option value="Nhật Bản">Nhật Bản</option>
                                <option value="Trung Quốc">Trung Quốc</option>
                                <option value="Nước khác">Khác</option>
                            </select>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select
                                className={`form-control selectpicker ${styles.customSelect}`}
                                title="Thời gian dự định du học"
                                {...this._handleChange('thoigianduhoc')}>
                                <option value="Năm 2018">Năm 2018</option>
                                <option value="Năm 2019">Năm 2019</option>
                                <option value="Năm 2020">Năm 2020</option>
                                <option value="Thời gian khác">Thời gian khác</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select
                                className={`form-control selectpicker ${styles.customSelect}`}
                                title="Bạn có nhu cầu học"
                                {...this._handleChange('nhucauhoc')}>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="Không">Không</option>
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <select className={`form-control selectpicker ${styles.customSelect}`} multiple
                                    title="Bạn biết chương trình này qua"
                                    data-selected-text-format="count>1" data-size="8"
                                    {...this._handleMultiChange('bietchuongtrinhquakenh')}>
                                <option value="Facebook SunriseVietnam">Facebook SunriseVietnam</option>
                                <option value="Website SunriseVietnam">Website SunriseVietnam</option>
                                <option value="Cốc Cốc">Cốc Cốc</option>
                                <option value="Truyền hình Hải Phòng">Truyền hình Hải Phòng</option>
                                <option value="Email">Email</option>
                                <option value="Google">Google</option>
                                <option value="Băng rôn">Băng rôn</option>
                                <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                                <option value="Dân trí">Dân trí</option>
                                <option value="Zing News">Zing News</option>
                                <option value="VnExpress">VnExpress</option>
                                <option value="Kênh khác">Khác</option>
                            </select>
                        </div>
                        <div className="col-xs-12">
                            <div className={styles.mdSpace}></div>
                            <button disabled={!this._isFormValid} className={`${styles.btnBlock}`}
                                    id={`${styles.btnRegister}`} type="button"
                                    onClick={this._registerSubmit}><h4>ĐĂNG KÝ</h4></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class SpecialForm extends React.Component {
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
        return (this.state.hovaten && regEmail.test(this.state.email) && this.state.sodienthoai && this.state.thamdutai && this.state.duhoctai && this.state.nguoidangkyla && this.state.thanhphodangsong && this.state.thoigianduhoc && this.state.nhucauhoc && this.state.duhoctai.length > 0 && this.state.bietchuongtrinhquakenh.length > 0);
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
            let newValue = this.state[key]
            const selectedValue = e.target.value
            if (e.target.checked) {
                newValue = _.union(newValue, [selectedValue])
            } else {
                newValue = _.without(newValue, selectedValue)
            }
            this.setState({[key]: newValue})
        }

    });

    render() {
        const duhoctai_ar = ["Anh", "Mỹ", "Canada", "Úc", "New Zealand", "Phần Lan", "Thụy Sỹ", "Hà Lan", "Đức", "Malaysia", "Singapore", "Thái Lan", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Nước khác"];
        const bietchuongtrinhquakenh_ar = ["Facebook SunriseVietnam", "Website SunriseVietnam", "Cốc Cốc", "Truyền hình Hải Phòng", "Email", "Google", "Băng rôn", "Bạn bè giới thiệu", "Dân trí", "Zing News", "VnExpress", "Kênh khác"];
        return (
            <div className="container">
                <form className="form-horizontal">
                    <div className="form-group">
                        <div className={`col-xs-12 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Họ và tên" {...this._handleChange('hovaten')}/>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <input className={`form-control ${styles.customInput}`}
                                   placeholder="Số điện thoại"  {...this._handleChange('sodienthoai')}/>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <input className={`form-control ${styles.customInput}`} type="text"
                                   placeholder="Email"  {...this._handleChange('email')}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <select
                                className={`form-control ${styles.customInput}`} {...this._handleChange('thamdutai')}
                                mobile="true">
                                <option disabled>Bạn sẽ tham dự sự kiện tại</option>
                                <option value="Hà Nội">Hà Nội, 13:00 - 14:00, Chủ nhật, ngày 04/03/2018, tại KS
                                    MOVENPICK
                                </option>
                                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh, 13:00 - 14:00, Thứ 7, ngày 03/03/2018,
                                    tại ÉN TEA HOUSE & RESTAURANT
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select
                                className={`form-control ${styles.customInput}`} {...this._handleChange('nguoidangkyla')}>
                                <option disabled>Bạn là</option>
                                <option value="Học sinh THCS">Học sinh THCS</option>
                                <option value="Học sinh THPT">Học sinh THPT</option>
                                <option value="Sinh viên Đại học">Sinh viên Đại học</option>
                                <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                                <option value="Phụ huynh">Phụ huynh</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select className={`form-control ${styles.customInput}`}
                                    {...this._handleChange('thanhphodangsong')}>
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
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomMD}`}>
                            <div className={`row ${styles.customCheckbox}`}>
                                <label className="col-xs-12">Bạn dự định du học tại</label>
                                {duhoctai_ar.map((dht) => {
                                    const self = this;
                                    return <div className="checkbox col-xs-6">
                                        <label key={dht}><input type="checkbox"
                                                                value={dht} {...self._handleMultiChange('duhoctai')}/>{dht}
                                        </label>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select className={`form-control ${styles.customInput}`}
                                    {...this._handleChange('thoigianduhoc')}>
                                <option disabled>Thời gian dự định du học</option>
                                <option value="Năm 2018">Năm 2018</option>
                                <option value="Năm 2019">Năm 2019</option>
                                <option value="Năm 2020">Năm 2020</option>
                                <option value="Thời gian khác">Thời gian khác</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select className={`form-control ${styles.customInput}`}
                                    {...this._handleChange('nhucauhoc')}>
                                <option disabled>Bạn có nhu cầu học</option>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="Không">Không</option>
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className={`row ${styles.customCheckbox}`}>
                                <label className="col-xs-12">Bạn biết chương trình này qua</label>
                                {bietchuongtrinhquakenh_ar.map((dht) => {
                                    const self = this;
                                    return <div className="checkbox col-xs-12">
                                        <label key={dht}><input type="checkbox"
                                                                value={dht} {...self._handleMultiChange('bietchuongtrinhquakenh')}/>{dht}
                                        </label>
                                    </div>
                                })}

                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className={styles.mdSpace}></div>
                            <button disabled={!this._isFormValid} className={`${styles.btnBlock}`}
                                    id={`${styles.btnRegister}`} type="button"
                                    onClick={this._registerSubmit}><h4>ĐĂNG KÝ</h4></button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

class SimpleSlider extends React.Component {
    render() {
        const settings = {
            className: 'center',
            centerPadding: '60px',
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                /*{breakpoint: 390, settings: {slidesToShow: 1, slidesToScroll: 1}},*/
                {breakpoint: 580, settings: {slidesToShow: 1, slidesToScroll: 1}},
                {breakpoint: 768, settings: {slidesToShow: 2, slidesToScroll: 2}},
                {breakpoint: 992, settings: {slidesToShow: 3, slidesToScroll: 3}},
                {breakpoint: 1200, settings: {slidesToShow: 4, slidesToScroll: 4}},
                {breakpoint: 100000, settings: {slidesToShow: 5, slidesToScroll: 5}}
            ]
        };
        const images = this.props.images;
        const prefix = this.props.id;
        return (
            <Slider {...settings} prevArrow={LeftNavButton} nextArrow={RightNavButton}>
                {images && images.map((source)=> {
                    const id = _.uniqueId(prefix);
                    return <div key={id} className={styles.sliderContent}>
                        <img src={source.src}/>
                        <div className={styles.lgSpace}></div>
                        <p className={styles.sliderCaption}>{source.text}</p>
                    </div>
                })}
            </Slider>
        );
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
        return <nav className={`navbar text-center navbar-fixed-top ${styles.navBarCustom}`}>
            <div className="container  text-center">
                <div className="container-fluid text-center">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#top-menu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a className="navbar-brand visible-xs" href="#"><img
                            src={require('../../photos/201609/small-logo.png')} className="img-responsive"/></a>

                    </div>
                    <div className={`collapse navbar-collapse text-center ${styles.centerMenu}`} id="top-menu">
                        <ul className={`nav navbar-nav ${styles.customNavBar}`}>
                            {/*<li><Link to="/" className={styles.customA}>TRANG CHỦ</Link></li>*/}
                            <li><Link to="/" hash="#opportunities" className={styles.customA}>TIÊU ĐIỂM<br
                                className="hidden-xs"/> SỰ KIỆN </Link></li>
                            <li><Link to="/" hash="#registerForm" className={styles.customA}>ĐĂNG KÝ<br
                                className="hidden-xs"/> THAM DỰ </Link></li>
                            <li><Link to="/">
                                <img className="hidden-xs" src={require('../../photos/201803/logo-sunrise.png')}
                                     width="100%"/>
                            </Link></li>
                            <li><Link to="/" hash="#sharing" className={styles.customA}>CẢM NHẬN CỦA<br
                                className="hidden-xs"/> DU HỌC SINH </Link></li>
                            <li><Link to="/" hash="#contact" className={styles.customA}>THÔNG TIN<br
                                className="hidden-xs"/> LIÊN HỆ </Link></li>
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
        this.slider = [
            {
                src: require('../../photos/201710/schools/kaplan.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/jamescook.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/abbey-dld.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/bicc.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/BlueMoutains.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/camosun.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/centennial.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/dimensions.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/huddersfield.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/into.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/NIC.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/psb.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/qut.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/san-mateo.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/studygroup.png'),
                text: ''
            },
            {
                src: require('../../photos/201710/schools/webter.png'),
                text: ''
            }
        ];
    }

    render() {
        const nua = navigator.userAgent;
        const is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
        const displayForm = (is_android) ? <SpecialForm onRegister={this.props.onRegister}/> :
            <DefaultForm onRegister={this.props.onRegister}/>
        return <div>
            {/*----------------------banner----------------------*/}
            <div className={`${styles.banner}`}>
                <img className="visible-xs" src={require('../../photos/201803/banner-small.png')} width="100%"/>
                {/*<img className="visible-xs" src={require('../../photos/201710/banner-small.jpg')} width="100%"/>*/}
                <div className={`hidden-xs col-sm-6 col-md-5 col-md-offset-1 text-right ${styles.module} ${styles.place}`}>
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-body">
                                <h4 className={`media-heading text-uppercase ${styles.red}`}><strong>*
                                    Hồ Chí Minh</strong></h4>
                            </div>
                            <div className="media-right media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>14:00 - 18:00, THỨ 7,
                                    03/03/2018</strong></h5>
                            </div>
                            <div className="media-right media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-body">
                                <h5 className="media-heading">
                                    <strong>Tại ÉN TEA HOUSE & RESTAURANT</strong><br/>
                                    Tòa nhà Robot, 308 Điện Biên Phủ,<br className="hidden-lg"/> Phường 4, Quận 3</h5>
                            </div>
                            <div className="media-right media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={`hidden-xs col-sm-6 col-md-5 ${styles.module} ${styles.place}`}>
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-left media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                            <div className="media-body">
                                <h4 className={`media-heading text-uppercase ${styles.red}`}><strong>*
                                    HÀ NỘI</strong></h4>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase">
                                    <strong>13:00 - 18:00, CHỦ NHẬT, 04/03/2018</strong>
                                </h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading"><strong>Tại KHÁCH SẠN MOVENPICK</strong><br/>
                                    83A Lý Thường Kiệt, quận Hoàn Kiếm</h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/*----------------------places----------------------*/}
            <div className="container visible-xs">
                <div className="col-xs-12 col-sm-8 col-sm-offset-2 text-center">
                    <div className={styles.mdSpace}></div>
                    <h2 className="semiBold">THỜI GIAN DIỄN RA</h2>
                    <img src={require('../../photos/201803/star-blue.png')}
                         width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={require('../../photos/201803/star-red.png')}
                         width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={require('../../photos/201803/star-blue.png')}
                         width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={require('../../photos/201803/star-red.png')}
                         width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={require('../../photos/201803/star-blue.png')} width='20px'/>
                    <div className={styles.mdSpace}></div>
                </div>
                <div className={`col-xs-12 ${styles.module}`}>
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-left media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                            <div className="media-body">
                                <h4 className={`media-heading text-uppercase ${styles.red}`}><strong><em>*
                                    Hồ Chí Minh</em></strong></h4>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>14:00 - 18:00, THỨ 7,
                                    03/03/2018</strong></h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading">
                                    <strong>Tại ÉN TEA HOUSE & RESTAURANT</strong><br/>
                                    Tòa nhà Robot, 308 Điện Biên Phủ, Phường 4, Quận 3</h5>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.mdSpace}></div>
                </div>
                <div className={`col-xs-12 ${styles.module}`}>
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-left media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                            <div className="media-body">
                                <h4 className={`media-heading text-uppercase ${styles.red}`}><strong><em>*
                                    HÀ NỘI</em></strong></h4>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase">
                                    <strong>13:00 - 18:00, CHỦ NHẬT, 04/03/2018</strong>
                                </h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading"><strong>Tại KHÁCH SẠN MOVENPICK</strong><br/>
                                    83A Lý Thường Kiệt, quận Hoàn Kiếm</h5>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.mdSpace}></div>
                    <div className={styles.smSpace}></div>
                </div>
                <div className="col-xs-10 col-xs-offset-1 text-center">
                    <div className={styles.hrCustom}></div>
                </div>
            </div>
            {/*----------------------opportunities----------------------*/}
            <a id="opportunities">
                <div className={styles.smSpace}></div>
            </a>
            <div className="container">
                <div className="row">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                        <h2 className="semiBold">TIÊU ĐIỂM CỦA SỰ KIỆN</h2>
                        <img src={require('../../photos/201803/star-blue.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-red.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-blue.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-red.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-blue.png')} width='20px'/>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-xs-12 col-sm-6 col-md-3 ${styles.oppContainer}`}>
                        <div className={`row ${styles.oppContent}`}>
                            <div className="col-xs-12">
                                <img src={require('../../photos/201803/opp-1.png')} className={styles.imgResponsive}/>
                                <div className="col-xs-12">
                                    <div className={styles.smSpace}></div>
                                    <h3 className="text-center"><b>GẶP TRỰC TIẾP ĐẠI DIỆN 20 TRƯỜNG PHỔ THÔNG, CAO ĐẲNG,
                                        ĐẠI HỌC LỚN TẠI MỸ VÀ CANADA</b></h3>
                                    <div className={`visible-xs ${styles.mdSpace}`}></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-6 col-md-3 ${styles.oppContainer}`}>
                        <div className={`row ${styles.oppContent}`}>
                            <div className="col-xs-12">
                                <img src={require('../../photos/201803/opp-2.png')} className={styles.imgResponsive}/>
                                <div className="col-xs-12">
                                    <div className={styles.smSpace}></div>
                                    <h3 className="text-center"><b>HỘI THẢO THẨM ĐỊNH HỒ SƠ TÀI CHÍNH DU HỌC MỸ VÀ
                                        CANADA</b></h3>
                                    <div className={`visible-xs ${styles.mdSpace}`}></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-6 col-md-3 ${styles.oppContainer}`}>
                        <div className={`row ${styles.oppContent}`}>
                            <div className="col-xs-12">
                                <img src={require('../../photos/201803/opp-3.png')} className={styles.imgResponsive}/>
                                <div className="col-xs-12">
                                    <div className={styles.smSpace}></div>
                                    <h3 className="text-center"><b>TƯ VẤN TRỰC TIẾP VỚI CÁC CHUYÊN GIA TƯ VẤN MỸ VÀ
                                        CANADA</b></h3>
                                    <div className={`visible-xs ${styles.mdSpace}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-6 col-md-3 ${styles.oppContainer}`}>
                        <div className={`row ${styles.oppContent}`}>
                            <div className="col-xs-12">
                                <img src={require('../../photos/201803/opp-4.png')} className={styles.imgResponsive}/>
                                <div className="col-xs-12">
                                    <div className={styles.smSpace}></div>
                                    <h3 className="text-center"><b>NHẬN ƯU ĐÃI HỖ TRỢ LỆ PHÍ THI IELTS HOẶC KHÓA HỌC
                                        IELTS</b></h3>
                                    <div className={`visible-xs ${styles.mdSpace}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <a id="registerForm">
                        <div className={styles.lgSpace}></div>
                    </a>
                </div>
            </div>
            {/*----------------------form----------------------*/}
            <div className={`${styles.formBg}`}>
                <div className="container">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                        <div className={`${styles.smSpace}`}></div>
                        <h2 className={`semiBold ${styles.white}`}>ĐĂNG KÝ THAM DỰ</h2>
                        <img src={require('../../photos/201803/star-white.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-white.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-white.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-white.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-white.png')} width='20px'/>
                    </div>
                </div>
                {displayForm}
                <a id="sharing">
                    <div className={styles.mdSpace}></div>
                </a>
            </div>
            {/*----------------------sharing----------------------*/}
            <div>
                <div className="container">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                        <div className={styles.smSpace}></div>
                        <h2 className="semiBold">CẢM NHẬN CỦA DU HỌC SINH</h2>
                        <img src={require('../../photos/201803/star-blue.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-red.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-blue.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-red.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-blue.png')} width='20px'/>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div
                            className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer1}`}></div>
                        <div className={`col-xs-12 ${styles.blueBg}`}>
                            <h3 className={`text-center semiBold ${styles.yellow} ${styles.captionCustom}`}>
                                DIỆP LINH KHANH</h3>
                        </div>
                        <div className={`col-xs-12`}>
                            <div className={styles.smSpace}></div>
                            <h4 className={`${styles.blue} ${styles.captionCustom} semiBold`}>DU HỌC SINH TẠI
                                MỸ</h4>
                            <p> Nước Mỹ trong mắt em đầy sự tự do
                                và bất ngờ, vì theo những gì em trải qua, mỗi một kì học là một sự khác biệt trong cuộc
                                sống rất lớn. Nếu không đi Mỹ thì thật sự em không hình dung ra nổi hiện tại em sẽ như
                                thế nào, haha. Nhưng chắc chắn là em sẽ thích sự trưởng thành của em sau khi dành 3 năm
                                ở Mỹ hơn là nếu em ở Việt Nam.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div
                            className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer2}`}></div>
                        <div className={`col-xs-12 ${styles.blueBg}`}>
                            <h3 className={`text-center semiBold ${styles.yellow} ${styles.captionCustom}`}>
                                NGUYỄN NHẬT ANH</h3>
                        </div>
                        <div className={`col-xs-12`}>
                            <div className={styles.smSpace}></div>
                            <h4 className={`${styles.blue} ${styles.captionCustom} semiBold`}>DU HỌC SINH TẠI
                                STONY BROOK SCHOOL, MA, MỸ</h4>
                            <p>Thời gian học trong trường giúp
                                mình biết cách sống và suy nghĩ trong một môi trường đa văn hoá, đa tôn giáo. Các môn
                                học ở trường như khoa học, lch sử dạy rất tốt. Cơ sở vật chất đầy đủ và môn thể chất còn
                                là môn bắt buộc nữa.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-0">
                        <div
                            className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer3}`}></div>
                        <div className={`col-xs-12 ${styles.blueBg}`}>
                            <h3 className={`text-center semiBold ${styles.yellow} ${styles.captionCustom}`}>
                                NGUYỄN THỊ HÂN</h3>
                        </div>
                        <div className={`col-xs-12`}>
                            <div className={styles.smSpace}></div>
                            <h4 className={`${styles.blue} ${styles.captionCustom} semiBold`}>DU HỌC SINH
                                CANADA TẠI CAMOSUN COLLEGE</h4>
                            <p>Nhà chủ rất tốt và nhiệt tình, em
                                không có gì để phàn nàn cả. Thỉnh thoảng chị chủ còn đưa đón em đi học, không thì em đi
                                xe bus miễn phí vì có thẻ sinh viên. Nhìn chung em rất hạnh phúc. Mọi việc đều rất hoàn
                                hảo.</p>
                        </div>
                    </div>
                </div>
                <a id="contact">
                    <div className={styles.lgSpace}></div>
                </a>
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
                    <div className={styles.smSpace}></div>
                    <div className="col-xs-12 text-center">
                        <h2><strong>THÔNG TIN LIÊN HỆ</strong></h2>
                        <img src={require('../../photos/201803/star-white.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-red.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-white.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-red.png')}
                             width='20px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img src={require('../../photos/201803/star-white.png')} width='20px'/>
                        <div className={styles.smSpace}></div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.lblue}>HÀ NỘI:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" src={require('../../photos/201609/place1.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">86 CỬA BẮC, Q. BA ĐÌNH</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <img className="media-object" width="16px"
                                         src={require('../../photos/201609/phone.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">024 3722 4898</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.lblue}>TIMES CITY:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" src={require('../../photos/201609/place1.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">TẦNG 2, TOÀ NHÀ T5, <br className="hidden-xs"/>KHU VĂN
                                        PHÒNG TIMES CITY, <br className="hidden-xs"/>
                                        458 MINH KHAI, Q. HAI BÀ TRƯNG, <br className="visible-lg"/>HÀ NỘI</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <a href="#">
                                        <img className="media-object" width="16px"
                                             src={require('../../photos/201609/phone.png')}/>
                                    </a>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">024 3204 8333</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.lblue}>HỒ CHÍ MINH:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" src={require('../../photos/201609/place1.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">LẦU 7, TOÀ NHÀ THANH DUNG, <br
                                        className="hidden-xs hidden-md"/>79 NGUYỄN CƯ TRINH, QUẬN 1</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <a href="#">
                                        <img className="media-object" width="16px"
                                             src={require('../../photos/201609/phone.png')}/>
                                    </a>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">028 3837 0226</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.lblue}>HẢI PHÒNG:</strong><br/></p>
                        <ul className="media-list">
                            <li className="media">
                                <div className="media-left media-top">
                                    <img className="media-object" src={require('../../photos/201609/place1.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">TẦNG 5, TOÀ NHÀ XỔ SỐ, <br className="hidden-xs"/>
                                        19 ĐIỆN BIÊN PHỦ, <br className="visible-md"/>Q. NGÔ QUYỀN</p>
                                </div>
                            </li>
                            <li className={`media ${styles.customMedia}`}>
                                <div className="media-left media-top">
                                    <a href="#">
                                        <img className="media-object" width="16px"
                                             src={require('../../photos/201609/phone.png')}/>
                                    </a>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">0225 365 3269</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 text-center">
                        <div className={styles.smSpace}></div>
                        <p>
                            <span className={styles.lblue}>WEBSITE:</span> <a target="_blank"
                                                                              href="http://www.sunrisevietnam.com/">SUNRISEVIETNAM.COM</a>
                            <span className="hidden-xs hidden-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><br
                            className="hidden-md hidden-lg"/>
                            <span className={styles.lblue}>E-MAIL:</span> <a href="mailto:info@sunrisevietnam.com">INFO@SUNRISEVIETNAM.COM</a><span
                            className="hidden-xs hidden-sm">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span><br
                            className="hidden-md hidden-lg"/>
                            <span className={styles.lblue}>FACEBOOK:</span> <a target="_blank"
                                                                               href="https://www.facebook.com/thaiduong.vietnam">WWW.FACEBOOK.COM/THAIDUONG.VIETNAM</a>
                        </p>

                        <div className={styles.smSpace}></div>
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
        if (ga) {
            ga('send', 'event', 'Click', 'Call button');
        }
    },
    render(){
        return (<div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show hidden-xs" id="coccoc-alo-phoneIcon"
                     style={{"right": "0px", "display": "block"}}>
            {/*<div className="coccoc-alo-ph-circle"></div>*/}
            <div className="coccoc-alo-ph-circle-fill"></div>
            <div className="coccoc-alo-ph-img-circle" onClick={this.handleClickPhone}></div>
        </div>)
    }
});