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

const _eventCode = '0ZqeEB7mJvlnnb0uvHSu';

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
            const msgId = this.ddp.method('registerEventGLVH', [_eventCode, obj]);
            this.ddp.on('result', function (msg) {
                if (msgId === msg.id && !msg.error) {
                    self.props.history.pushState(null, "/thanks-you")
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
            <div className="">
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
                                className="form-control selectpicker"
                                title="Bạn sẽ tham dự triển lãm tại" {...this._handleChange('thamdutai')} mobile="true">

                                <option value="Hà Nội">Hà Nội, thứ 6 từ 17 giờ - 20 giờ, ngày 17/03/2017, tại Star
                                    Galaxy Convention, 87 Láng Hạ - Đống Đa
                                </option>
                                <option value="Hải Phòng">Hải Phòng, thứ 7 từ 14 giờ - 17 giờ, ngày 18/03/2017,
                                    tại khách sạn Nam Cường, 47 Lạch Tray - Ngô Quyền
                                </option>
                                <option value="TP HCM">Tp. Hồ Chí Minh, chủ nhật từ 14 giờ - 17 giờ, ngày 19/03/2017,
                                    tại khách sạn Liberty Central Riverside Saigon, 17 Tôn Đức Thắng - Quận 1
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select className="form-control selectpicker"
                                    title="Bạn là" {...this._handleChange('nguoidangkyla')}>
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
                            <select className="form-control selectpicker" multiple
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
                                <option value="Khác">Khác</option>
                            </select>
                        </div>

                        <div
                            className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS} ${styles.marginBottomSM}`}>
                            <select
                                className="form-control selectpicker" title="Thời gian dự định du học"
                                {...this._handleChange('thoigianduhoc')}>
                                <option value="Năm 2016">Năm 2016</option>
                                <option value="Năm 2017">Năm 2017</option>
                                <option value="Năm 2018">Năm 2018</option>
                                <option value="Năm 2019">Năm 2019</option>
                                <option value="Năm 2020">Năm 2020</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select
                                className="form-control selectpicker"
                                title="Bạn có nhu cầu học"
                                {...this._handleChange('nhucauhoc')}>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="SAT">SAT</option>
                                <option value="GMAT">GMAT</option>
                                <option value="Không">Không</option>
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <select className="form-control selectpicker" multiple
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
                                <option value="Khác">Khác</option>
                            </select>
                        </div>

                        <div className="col-xs-12">
                            <div className={styles.smallSpacing}></div>
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
        const duhoctai_ar = ["Anh", "Mỹ", "Canada", "Úc", "New Zealand", "Phần Lan", "Thụy Sỹ", "Hà Lan", "Đức", "Malaysia", "Singapore", "Thái Lan", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Khác"];
        const bietchuongtrinhquakenh_ar = ["Facebook SunriseVietnam", "Website SunriseVietnam", "Truyền hình Hải Phòng", "Email", "Google", "Băng rôn", "Bạn bè giới thiệu", "Dân trí", "Zing News", "VnExpress", "Khác"]
        return (
            <div className="">
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
                                <option disabled>Bạn sẽ tham dự triển lãm tại</option>
                                <option value="Hà Nội">Hà Nội, thứ 6 từ 17 giờ - 20 giờ, ngày 17/03/2017, tại Star
                                    Galaxy Convention, 87 Láng Hạ - Đống Đa
                                </option>
                                <option value="Hải Phòng">Hải Phòng, thứ 7 từ 14 giờ - 17 giờ, ngày 18/03/2017,
                                    tại khách sạn Nam Cường, 47 Lạch Tray - Ngô Quyền
                                </option>
                                <option value="TP HCM">Tp. Hồ Chí Minh, chủ nhật từ 14 giờ - 17 giờ, ngày 19/03/2017,
                                    tại khách sạn Liberty Central Riverside Saigon, 17 Tôn Đức Thắng - Quận 1
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
                                <option value="Sinh viên Đại học">Sinh viên đại học</option>
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
                                <option value="Năm 2016">Năm 2016</option>
                                <option value="Năm 2017">Năm 2017</option>
                                <option value="Năm 2018">Năm 2018</option>
                                <option value="Năm 2019">Năm 2019</option>
                                <option value="Năm 2020">Năm 2020</option>
                            </select>
                        </div>
                        <div className={`col-xs-12 col-sm-6 col-md-4 ${styles.marginBottomXS}`}>
                            <select className={`form-control ${styles.customInput}`}
                                {...this._handleChange('nhucauhoc')}>
                                <option disabled>Bạn có nhu cầu học</option>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="SAT">SAT</option>
                                <option value="GMAT">GMAT</option>
                                <option value="Không">Không</option>
                            </select>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className={`row ${styles.customCheckbox}`}>
                                <label className="col-xs-12">Bạn biết chương trình này qua</label>
                                {bietchuongtrinhquakenh_ar.map((dht) => {
                                    const self = this
                                    return <div className="checkbox col-xs-12">
                                        <label key={dht}><input type="checkbox"
                                                                value={dht} {...self._handleMultiChange('bietchuongtrinhquakenh')}/>{dht}
                                        </label>
                                    </div>
                                })}

                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className={styles.smallSpacing}></div>
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

                        <a className="navbar-brand visible-xs" href="#"><img
                            src={require('../../photos/201609/small-logo.png')} className="img-responsive"/></a>

                    </div>
                    <div className={`collapse navbar-collapse text-center ${styles.centerMenu}`} id="top-menu">
                        <ul className="nav navbar-nav">
                            <li><Link className={styles.customA} id="menuhome" to="/">TRANG CHỦ</Link></li>
                            <li><Link to="/" hash="#places" className={`visible-xs ${styles.customA}`}>ĐỊA ĐIỂM TRIỂN
                                LÃM</Link></li>
                            <li><Link to="/" hash="#registerForm" className={`visible-xs ${styles.customA}`}>ĐĂNG KÝ
                                THAM DỰ</Link></li>
                            <li><Link to="/" hash="#schools" className={styles.customA}>CÁC TRƯỜNG/TỔ CHỨC<br
                                className="hidden-xs hidden-lg"/> THAM GIA TRIỂN LÃM</Link>
                            </li>
                            <li><Link to="/" hash="#opportunities" className={styles.customA}>CƠ HỘI TẠI<br
                                className="hidden-xs hidden-lg"/> TRIỂN LÃM</Link></li>
                            <li><Link to="/" hash="#sharing" className={styles.customA}>DU HỌC SINH<br
                                className="hidden-xs hidden-lg"/> CHIA SẺ</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right hidden-xs">
                            <li><a href="http://www.sunrisevietnam.com/" target="_blank"><img height="70"
                                                                                              src={require('../../photos/201609/logo.png')}/></a>
                            </li>
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
        return <div>
            {/*----------------------banner----------------------*/}
            <div className={`${styles.banner}`}>
                <img className="hidden-xs" src={require('../../photos/201703/banner.png')} width="100%"/>
                <img className="visible-xs" src={require('../../photos/201703/small-banner.png')} width="100%"/>
            </div>

            {/*----------------------places----------------------*/}
            <a id="places" className="visible-xs">
                <div className={styles.smallSpacing}></div>
            </a>

            <div className="container">
                <div className="col-xs-12 col-md-8 col-md-offset-2 text-center">
                    <div className={styles.mediumSpacing}></div>
                    <img src={require('../../photos/201609/title-places.png')} className={styles.imgResponsive}/>
                    <div className={styles.smallSpacing}></div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 module">
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-left media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading text-uppercase"><strong className={`${styles.dblue}`}><em>*
                                    HÀ NỘI</em></strong></h4>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Thứ 6, từ 17 giờ - 20 giờ</strong><br/>
                                    <span className={styles.spaceImg}></span>Ngày 17/03/2017</h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Tại Star Galaxy Convention</strong><br/>
                                    87 Láng Hạ - Đống Đa<br/>
                                    (Cạnh rạp chiếu phim Quốc gia)</h5>
                            </div>
                        </li>
                    </ul>
                    <div className={`visible-xs visible-sm ${styles.smallSpacing}`}></div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 module">
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-left media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading text-uppercase"><strong className={`${styles.dblue}`}><em>*
                                    HẢI PHÒNG</em></strong></h4>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Thứ 7, từ 14 giờ - 17 giờ</strong><br/>
                                    Ngày 18/03/2017</h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Tại khách sạn Nam
                                    Cường</strong><br/>
                                    47 Lạch Tray - Ngô Quyền</h5>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4 module">
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-left media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading text-uppercase"><strong className={`${styles.dblue}`}><em>*
                                    Hồ Chí Minh</em></strong></h4>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Chủ nhật, TỪ 14 GIỜ - 17
                                    GIỜ</strong><br/>
                                    Ngày 19/03/2017</h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Tại KS Liberty Central Riverside Saigon</strong><br/>
                                    17 Tôn Đức Thắng - Quận 1</h5>
                            </div>
                        </li>
                    </ul>
                </div>
                {/*----------------------form----------------------*/}
                <div className="row">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                        <a id="registerForm">
                            <div className={`hidden-lg ${styles.smallSpacing}`}></div>
                        </a>
                        <div className={`hidden-xs ${styles.largeSpacing}`}></div>
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <img src={require('../../photos/201609/title-form.png')} className={styles.imgResponsive}/>

                    </div>
                </div>
                {displayForm}
                <a id="schools">
                    <div className={styles.mediumSpacing}></div>
                </a>
            </div>
            {/*----------------------schools----------------------*/}
            <div className={styles.schoolsContainer}>
                <div className={`container ${styles.noPadding}`}>
                    <div className="col-xs-12 col-md-8 col-md-offset-2 text-center">
                        <div className={styles.mediumSpacing}></div>
                        <img src={require('../../photos/201703/title-schools.png')} className={styles.imgResponsive}/>
                        <div className={styles.smallSpacing}></div>
                        <h5 className="hidden-xs hidden-sm"><i>(Di chuột để tìm hiểu thêm)</i></h5>
                        <p className="hidden-md hidden-lg"><i>(Chọn quốc gia để tìm hiểu thêm)</i></p>
                    </div>
                    <WorldMap className="col-xs-12 world-map"/>
                </div>
            </div>
            {/*----------------------opportunities----------------------*/}
            <a id="opportunities">
                <div className={styles.smallSpacing}></div>
            </a>

            <div className="container">
                <div className="row">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 ${styles.sectionTitle} ${styles.noPadding}`}>
                        <div className={styles.smallSpacing}></div>
                        <img src={require('../../photos/201703/title-opp.png')} className={styles.imgResponsive}/>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-xs-12 col-sm-6 module ${styles.noPadding}`}>
                        <div className="row">
                            <div
                                className="col-xs-4 col-xs-offset-4 col-md-2 col-md-offset-2 text-right">
                                <img src={require('../../photos/201703/woman.png')} className={styles.imgResponsive}/>

                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <h3 className={styles.xsCenter}><strong>TƯ VẤN TỔNG QUAN:</strong></h3>
                                <h5 className={styles.xsCenter}><strong>Trả lời câu hỏi du học, luyện thi IELTS/TOEFL từ
                                    A đến Z</strong></h5>
                                <h5 className={styles.xsCenter}><strong>Tìm hiểu thủ tục chuẩn bị tài chính du học với
                                    Ngân hàng Quân Đội</strong></h5>
                                <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-6 module ${styles.noPadding}`}>
                        <div className="row">
                            <div
                                className="col-xs-4 col-xs-offset-4 col-md-2 col-md-offset-2 text-right">
                                <img src={require('../../photos/201703/man.png')} className={styles.imgResponsive}/>

                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <h3 className={styles.xsCenter}><strong>TƯ VẤN CHUYÊN SÂU:</strong></h3>
                                <h5 className={styles.xsCenter}><strong>Gặp trực tiếp đại diện trường,</strong></h5>
                                <h5 className={styles.xsCenter}><strong>nhận quà tại quầy trường</strong></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-xs-12 col-sm-6 module ${styles.noPadding}`}>
                        <div className="row">
                            <div className={styles.mediumSpacing}></div>
                            <div
                                className="col-xs-4 col-xs-offset-4 col-md-2 col-md-offset-2 text-right">
                                <img src={require('../../photos/201703/scholarship.png')}
                                     className={styles.imgResponsive}/>

                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <h3 className={styles.xsCenter}><strong>HỌC BỔNG TẠI CHỖ:</strong></h3>
                                <h5 className={styles.xsCenter}><strong>Phỏng vấn học bổng các bậc học,</strong></h5>
                                <h5 className={styles.xsCenter}><strong>thi thử IELTS Speaking,</strong></h5>
                                <h5 className={styles.xsCenter}><strong>Phỏng vấn thử visa Mỹ</strong></h5>
                            </div>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-6 module ${styles.noPadding}`}>
                        <div className="row">
                            <div className={styles.mediumSpacing}></div>
                            <div
                                className="col-xs-4 col-xs-offset-4 col-md-2 col-md-offset-2 text-right">
                                <img src={require('../../photos/201703/gift.png')}
                                     className={styles.imgResponsive}/>

                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <h3 className={styles.xsCenter}><strong>QUÀ TẶNG KHI THAM GIA:</strong></h3>
                                <h5 className={styles.xsCenter}><strong>Túi, bút, sổ, móc khóa</strong></h5>
                                <h5 className={styles.xsCenter}><strong>Cẩm nang du học</strong></h5>
                                <h5 className={styles.xsCenter}><strong>Bốc thăm hỗ trợ lệ phí thi IELTS</strong></h5>
                                <h5 className={styles.xsCenter}><strong>Tặng voucher vé máy bay (Khi ký ngay hợp đồng
                                    tại triển lãm)</strong></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*----------------------sharing----------------------*/}
            <a id="sharing">
                <div className={styles.mediumSpacing}></div>
            </a>

            <div className={`${styles.grayBg}`}>
                <div className="container">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                        <div className={styles.smallSpacing}></div>
                        <img src={require('../../photos/201609/title-sharing.png')} className={styles.imgResponsive}/>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer1}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Mai Đức</h3>
                                <hr className={`${styles.hrCustom} ${styles.lgreenBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Em nghĩ trước khi du học Anh các bạn học sinh cần cải thiện tốt kỹ năng ngoại ngữ.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer2}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Thùy My</h3>
                                <hr className={`${styles.hrCustom} ${styles.orangeBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Theo học Cao Đẳng Cộng Đồng, cái đầu tiên em có được chính là kiến thức.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer3}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Hoàng Nhật Anh</h3>
                                <hr className={`${styles.hrCustom} ${styles.lblueBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Sau khi đi du học nhất là 3 năm tại trường Stony Brook, em đã cảm nhận được mình đã trưởng thành hơn rất nhiều.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer4}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Phạm Duy Đức</h3>
                                <hr className={`${styles.hrCustom} ${styles.yellowBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Trước khi đi du học hãy chuẩn bị tâm lý thật vững vàng.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer5}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Diệp Khánh Linh</h3>
                                <hr className={`${styles.hrCustom} ${styles.orangeBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Trên con đường du học của mình đừng lo lắng, đừng sợ hãi, mà hãy biết cách học hỏi.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer6}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Thành Long</h3>
                                <hr className={`${styles.hrCustom} ${styles.lblueBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Đi du học khiến mình tự lập hơn, biết lo nghĩ về sự nghiệp và cuộc sống.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer7}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Đặng Diệu Linh</h3>
                                <hr className={`${styles.hrCustom} ${styles.yellowBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Du học là một chuyến đi mà bạn được trang bị kiến thức, gặp gỡ người mới để mở mang tầm mắt.</p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs hidden-sm col-md-3">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer8}`}>
                            <div className={`col-xs-12 ${styles.imgMainContent}`}>
                                <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Minh Tuấn</h3>
                                <hr className={`${styles.hrCustom} ${styles.lgreenBg} ${styles.captionCustom}`}/>
                                <p className={`${styles.white} ${styles.captionCustom}`}>Du học là chuyến hành trình dài nhất mà mình từng tham gia.</p>
                            </div>
                        </div>
                    </div>
                    {/*-------sharing - mobile-------*/}
                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer1}`}></div>
                        <div className={`col-xs-12 ${styles.lgreenBg}`}>
                            <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Mai Đức</h3>
                            <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Em nghĩ trước khi du học Anh các bạn học sinh cần cải thiện tốt kỹ năng ngoại ngữ.</p>
                        </div>
                    </div>

                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer2}`}>
                        </div>
                        <div className={`col-xs-12 ${styles.orangeBg}`}>
                            <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Thùy My</h3>
                            <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Theo học Cao Đẳng Cộng Đồng, cái đầu tiên em có được chính là kiến thức.</p>
                        </div>
                    </div>
                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer3}`}></div>
                        <div className={`col-xs-12 ${styles.lblueBg}`}>
                            <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Hoàng Nhật Anh</h3>
                            <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Sau khi đi du học nhất là 3 năm tại trường Stony Brook, em đã cảm nhận được mình đã trưởng thành hơn rất nhiều.</p>
                        </div>
                    </div>
                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer4}`}></div>
                        <div className={`col-xs-12 ${styles.yellowBg}`}>
                            <h3 className={`${styles.captionCustom}`}>Phạm Duy Đức</h3>
                            <hr className={`${styles.hrCustom} ${styles.blackBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.captionCustom}`}>Trước khi đi du học hãy chuẩn bị tâm lý thật vững vàng.<br/><br/></p>
                        </div>
                    </div>
                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer5}`}></div>
                        <div className={`col-xs-12 ${styles.lgreenBg}`}>
                            <h3 className={`${styles.white} ${styles.captionCustom}`}>Diệp Khánh Linh</h3>
                            <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Trên con đường du học của mình đừng lo lắng, đừng sợ hãi, mà hãy biết cách học hỏi.</p>
                        </div>
                    </div>
                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer6}`}></div>
                        <div className={`col-xs-12 ${styles.orangeBg}`}>
                            <h3 className={`${styles.white} ${styles.captionCustom}`}>Nguyễn Thành Long</h3>
                            <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Đi du học khiến mình tự lập hơn, biết lo nghĩ về sự nghiệp và cuộc sống.</p>
                        </div>
                    </div>
                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer7}`}></div>
                        <div className={`col-xs-12 ${styles.lblueBg}`}>
                            <h3 className={`${styles.white} ${styles.captionCustom}`}>Đặng Diệu Linh</h3>
                            <hr className={`${styles.hrCustom} ${styles.grayBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.white} ${styles.captionCustom}`}>Du học là một chuyến đi mà bạn được trang bị kiến thức, gặp gỡ người mới để mở mang tầm mắt.</p>
                        </div>
                    </div>
                    <div className="hidden-md hidden-lg col-xs-12 col-sm-6">
                        <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                        <div className={`col-xs-12 ${styles.noPadding} ${styles.imgMainContainer} ${styles.imgContainer8}`}></div>
                        <div className={`col-xs-12 ${styles.yellowBg}`}>
                            <h3 className={`${styles.captionCustom}`}>Nguyễn Minh Tuấn</h3>
                            <hr className={`${styles.hrCustom} ${styles.blackBg} ${styles.captionCustom}`}/>
                            <p className={`${styles.captionCustom}`}>Du học là chuyến hành trình dài nhất mà mình từng tham gia.</p>
                        </div>
                    </div>
                </div>
                <a id="schools">
                    <div className={styles.mediumSpacing}></div>
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
                    <div className={styles.smallSpacing}></div>
                    <div className="col-xs-12">
                        <h3 className="text-center"><strong>MỌI CHI TIẾT XIN LIÊN HỆ</strong></h3>
                        <h4 className="text-center"><span className={styles.orange}>HOTLINE:</span> 098 846 5300</h4>
                        <div className={styles.smallSpacing}></div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <p><strong className={styles.orange}>HÀ NỘI:</strong><br/></p>
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
                                    <a href="#">
                                        <img className="media-object" width="16px"
                                             src={require('../../photos/201609/phone.png')}/>
                                    </a>
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
                                    <img className="media-object" src={require('../../photos/201609/place1.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">TẦNG 2, TOÀ NHÀ T5,<br/>
                                        KHU VĂN PHÒNG TIMES CITY<br/>
                                        458 MINH KHAI, Q. HAI BÀ TRƯNG, HÀ NỘI</p>
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
                                    <img className="media-object" src={require('../../photos/201609/place1.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">LẦU 7, TOÀ NHÀ THANH DUNG,<br/>
                                        179 NGUYỄN CƯ TRINH, QUẬN 1</p>
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
                                    <img className="media-object" src={require('../../photos/201609/place1.png')}/>
                                </div>
                                <div className="media-body">
                                    <p className="media-heading">29 NGUYỄN TRÃI, NGÔ QUYỀN</p>
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
                                    <p className="media-heading">031 365 3269</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 text-center">
                        <div className={styles.smallSpacing}></div>
                        <p>
                            <span className={styles.lblue}>WEB:</span> SUNRISEVIETNAM.COM
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
            <div className="coccoc-alo-ph-circle-fill"></div>
            <div className="coccoc-alo-ph-img-circle"  onClick={this.handleClickPhone}></div>
        </div>)
    }
});