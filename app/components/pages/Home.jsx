import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import DDP from 'ddp.js';
import styles from '../../main201609.scss';
import Slider from 'react-slick';

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
}

const _eventCode = 'WPwoyeHuDBFYXdBYM3C6CW0XUQGGrwVgqKPEpuWu';

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

const LeftNavButton = React.createClass({
    render() {
        return (
            <img {...this.props} src={require('../../photos/201609/Arrow_L.png')}/>
        )
    }
})

const RightNavButton = React.createClass({
    render() {
        return (
            <img {...this.props} src={require('../../photos/201609/Arrow_R.png')}/>
        )
    }
});

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

    })

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
                                <option value="TP HCM">Tp. Hồ Chí Minh, thứ 6 từ 16 giờ - 20 giờ, ngày 30/09/2016,
                                    tại khách sạn Liberty Central Saigon, 59-61 Pasteur - Quận 1
                                </option>
                                <option value="Hà Nội">Hà Nội, thứ 7 từ 14 giờ - 18 giờ, ngày 01/10/2016, tại Star
                                    Galaxy Convention, 87 Láng Hạ - Đống Đa
                                </option>
                                <option value="Hải Phòng">Hải Phòng, Chủ nhật từ 9 giờ - 12 giờ, ngày 02/10/2016,
                                    tại khách sạn Nam Cường, 47 Lạch Tray
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
;

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
                                <option value="TP HCM">Tp. Hồ Chí Minh, thứ 6 từ 16 giờ - 20 giờ, ngày 30/09/2016,
                                    tại khách sạn Liberty Central Saigon, 59-61 Pasteur - Quận 1
                                </option>
                                <option value="Hà Nội">Hà Nội, thứ 7 từ 14 giờ - 18 giờ, ngày 01/10/2016, tại Star
                                    Galaxy Convention, 87 Láng Hạ - Đống Đa
                                </option>
                                <option value="Hải Phòng">Hải Phòng, Chủ nhật từ 9 giờ - 12 giờ, ngày 02/10/2016,
                                    tại khách sạn Nam Cường, 47 Lạch Tray
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
;

class SimpleSlider extends React.Component {
    render() {
        const settings = {
            dots: true,
            className: 'center',
            centerPadding: '60px',
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            responsive: [
                {breakpoint: 390, settings: {slidesToShow: 1, slidesToScroll: 1}},
                {breakpoint: 580, settings: {slidesToShow: 2, slidesToScroll: 2}},
                {breakpoint: 768, settings: {slidesToShow: 3, slidesToScroll: 3}},
                {breakpoint: 992, settings: {slidesToShow: 4, slidesToScroll: 4}},
                {breakpoint: 1200, settings: {slidesToShow: 5, slidesToScroll: 5}},
                {breakpoint: 100000, settings: {slidesToShow: 6, slidesToScroll: 6}}
            ]
        };
        const images = this.props.images;
        const prefix = this.props.id;
        return (
            <Slider {...settings} prevArrow={LeftNavButton} nextArrow={RightNavButton}>
                {images && images.map((src)=> {
                    const id = _.uniqueId(prefix)
                    return <div key={id}><img src={src}/></div>
                })}
            </Slider>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.slider1 = [
            require('../../photos/201609/schools-1/Abbey2.png'),
            require('../../photos/201609/schools-1/BlueMoutains2.png'),
            require('../../photos/201609/schools-1/Chase-Grammar-School2.png'),
            require('../../photos/201609/schools-1/Dimension2.png'),
            require('../../photos/201609/schools-1/JCU2.png'),
            require('../../photos/201609/schools-1/Knox-School2.png'),
            require('../../photos/201609/schools-1/Le_Cordon_Bleu2.png'),
            require('../../photos/201609/schools-1/St-Paul-International-College2.png'),
            require('../../photos/201609/schools-1/The-Oxford-International-Group2.png'),
            require('../../photos/201609/schools-1/Toronto2.png'),
            require('../../photos/201609/schools-1/mk.png'),
        ];
        this.slider2 = [
            require('../../photos/201609/Study Group/Bellerbys-College.png'),
            require('../../photos/201609/Study Group/James-Madison.png'),
            require('../../photos/201609/Study Group/Lancaster-University.png'),
            require('../../photos/201609/Study Group/LongIsland-University.png'),
            require('../../photos/201609/Study Group/Maine.png'),
            require('../../photos/201609/Study Group/roosevelt.png'),
            require('../../photos/201609/Study Group/Taylors-College.png'),
            require('../../photos/201609/Study Group/The-University-of-Vermont.png'),
            require('../../photos/201609/Study Group/University-of-Huddersfield.png'),
            require('../../photos/201609/Study Group/University-of-Leicerter.png'),
            require('../../photos/201609/Study Group/University-of-Sussex.png'),
            require('../../photos/201609/Study Group/Widener-University.png'),
        ];
        this.slider3 = [
            require('../../photos/201609/Kings/canisius-college.png'),
            require('../../photos/201609/Kings/Kings.png'),
            require('../../photos/201609/Kings/Kings-New-York.png'),
            require('../../photos/201609/Kings/Boston.png'),
            require('../../photos/201609/Kings/Bournemouth.png'),
            require('../../photos/201609/Kings/Kings-New-York-(Concordia).png'),
            require('../../photos/201609/Kings/London.png'),
            require('../../photos/201609/Kings/Los-Angeles-(Hollywood).png'),
            require('../../photos/201609/Kings/Los-Angeles-(Marymount).png'),
            require('../../photos/201609/Kings/New-Jersey-(Rider).png'),
            require('../../photos/201609/Kings/New-York-State-(Canisius).png'),
            require('../../photos/201609/Kings/Oxford.png'),
            require('../../photos/201609/Kings/Marymount-California-University.png'),
            require('../../photos/201609/Kings/Rider-University.png'),
            require('../../photos/201609/Kings/University-of-Southern-California.png'),
        ];
        this.slider4 = [
            require('../../photos/201609/Kaplan/UIC.png'),
            require('../../photos/201609/Kaplan/Pacific.png'),
            require('../../photos/201609/Kaplan/USC.png'),
            require('../../photos/201609/Kaplan/Central.png'),
            require('../../photos/201609/Kaplan/Adelphi.png'),
            require('../../photos/201609/Kaplan/LSU.png'),
            require('../../photos/201609/Kaplan/KU.png'),
            require('../../photos/201609/Kaplan/FIU.png'),
            require('../../photos/201609/Kaplan/Auburn.png'),
            require('../../photos/201609/Kaplan/American-U.png'),
        ]
    }

    render() {
        const nua = navigator.userAgent;
        const is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
        const displayForm = (is_android) ? <SpecialForm onRegister={this.props.onRegister}/> :
            <DefaultForm onRegister={this.props.onRegister}/>
        return <div>
            {/*banner*/}
            <div className={`${styles.banner}`}>
                <img className="hidden-xs" src={require('../../photos/201609/cover.png')} width="100%"/>
                <img className="visible-xs" src={require('../../photos/201609/small-banner.png')} width="100%"/>
            </div>
            {/*places*/}
            <a id="places" className="visible-xs"></a>

            <div className="container">
                <div className="col-xs-12 col-md-8 col-md-offset-2 text-center">
                    <div className={styles.mediumSpacing}></div>
                    <img src={require('../../photos/201609/title-places.png')} className={styles.imgResponsive}/>

                    <div className={styles.smallSpacing}></div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <ul className="media-list">
                        <li className="media">
                            <div className="media-left media-top">
                                <p className={styles.iconPlaces}></p>
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading text-uppercase"><strong className={`${styles.dblue}`}><em>*
                                    TP.HCM</em></strong></h4>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/time.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>THỨ 6, TỪ 16 GIỜ - 20
                                    GIỜ</strong><br/>
                                    Ngày 30/09/2016</h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Tại KS Liberty Central
                                    Saigon</strong><br/>
                                    59-61 Pasteur - Quận 1</h5>
                            </div>
                        </li>
                    </ul>
                    <div className={`visible-xs ${styles.smallSpacing}`}></div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
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
                                <h5 className="media-heading text-uppercase"><strong>Thứ 7 từ 14 giờ - 18
                                    giờ</strong><br/>
                                    <span className={styles.spaceImg}></span>Ngày
                                    01/10/2016</h5>
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
                <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-0">
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
                                <h5 className="media-heading text-uppercase"><strong>Chủ nhật từ 9 giờ - 12 giờ</strong><br/>
                                    Ngày 02/10/2016</h5>
                            </div>
                        </li>
                        <li className={`media ${styles.customMedia}`}>
                            <div className="media-left media-top">
                                <img src={require('../../photos/201609/place.png')} className={styles.iconPlaces}/>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading text-uppercase"><strong>Tại khách sạn Nam
                                    Cường</strong><br/>
                                    47 Lạch Tray</h5>
                            </div>
                        </li>
                    </ul>
                </div>
                {/*----------------------form----------------------*/}
                <div className="row">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                        <a id="registerForm">
                            <div className={styles.smallSpacing}></div>
                        </a>

                        <div className={`hidden-lg ${styles.largeSpacing}`}></div>
                        <img src={require('../../photos/201609/title-form.png')} className={styles.imgResponsive}/>

                    </div>
                </div>
                {displayForm}
            </div>
            {/*----------------------opportunities----------------------*/}
            <a id="opportunities">
                <div className={styles.mediumSpacing}></div>
            </a>

            <div className={`${styles.opportunities}`}>
                <div className="container">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 ${styles.sectionTitle}`}>
                        <div className={styles.mediumSpacing}></div>
                        <img src={require('../../photos/201609/title-opp.png')} className={styles.imgResponsive}/>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="row">
                            <div
                                className="col-xs-4 col-xs-offset-4 col-sm-3 col-md-2 col-md-offset-2 text-right">
                                <img src={require('../../photos/201609/woman.png')} className={styles.imgResponsive}/>

                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </div>
                            <div className="col-xs-12 col-sm-9 col-md-8">
                                <h4><strong>TƯ VẤN TỔNG QUAN:</strong></h4>

                                <h5><strong>Trả lời câu hỏi du học</strong></h5>
                                <h5><strong>Luyện thi IELTS/TOEFL từ A đến Z</strong></h5>

                                <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="row">
                            <div
                                className="col-xs-4 col-xs-offset-4 col-sm-3 col-md-2 col-md-offset-2 text-right">
                                <img src={require('../../photos/201609/man.png')} className={styles.imgResponsive}/>

                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </div>
                            <div className="col-xs-12 col-sm-9 col-md-8">
                                <h4><strong>TƯ VẤN CHUYÊN SÂU:</strong></h4>
                                <h5><strong>Gặp trực tiếp đại diện trường,</strong></h5>
                                <h5><strong>nhận quà tại quầy trường</strong></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="row">
                            <div className={styles.mediumSpacing}></div>
                            <div
                                className="col-xs-4 col-xs-offset-4 col-sm-2 col-sm-offset-2 col-md-1 col-md-offset-4 text-right">
                                <img src={require('../../photos/201609/schoolships.png')}
                                     className={styles.imgResponsive}/>

                                <div className={`visible-xs ${styles.smallSpacing}`}></div>
                            </div>
                            <div className="col-xs-12 col-sm-8 col-md-7">
                                <h4><strong>HỌC BỔNG TẠI CHỖ:</strong></h4>
                                <h5><strong>Phỏng vấn học bổng các bậc học, thi thử IELTS Speaking,</strong></h5>
                                <h5><strong>Phỏng vấn thử visa Mỹ như thế nào nhỉ?</strong></h5>
                            </div>
                        </div>
                        <a id="gifts">
                            <div className={styles.mediumSpacing}></div>
                        </a>
                    </div>
                </div>
            </div>
            {/*----------------------gifts----------------------*/}
            <div className={styles.smallSpacing}></div>
            <div className="container">
                <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                    <img src={require('../../photos/201609/title-gifts.png')} className={styles.imgResponsive}/>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <div className="row">
                        <div className="col-xs-6 col-xs-offset-3 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                            <img src={require('../../photos/201609/scholarship.png')}
                                 className={styles.imgResponsive}/>

                            <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                        </div>
                        <div className="col-xs-12">
                            <h4 className="text-center"><strong>CƠ HỘI<br className="visible-lg"/> HỌC BỔNG TỚI 70%</strong></h4>

                            <div className={`visible-xs ${styles.smallSpacing}`}></div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <div className="row">
                        <div className="col-xs-6 col-xs-offset-3 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                            <img src={require('../../photos/201609/tui-but-moc-khoa.png')}
                                 className={styles.imgResponsive}/>

                            <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                        </div>
                        <div className="col-xs-12">
                            <h4 className="text-center"><strong>TÚI, SỔ,<br className="visible-lg"/> BÚT, MÓC
                                KHÓA</strong></h4>

                            <div className={`visible-xs ${styles.smallSpacing}`}></div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <div className="row">
                        <div className="col-xs-6 col-xs-offset-3 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                            <img src={require('../../photos/201609/cam-nang.png')} className={styles.imgResponsive}/>

                            <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                        </div>
                        <div className="col-xs-12">
                            <h4 className="text-center"><strong>CẨM NANG DU HỌC</strong></h4>

                            <div className={`visible-xs ${styles.smallSpacing}`}></div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <div className="row">
                        <div className="col-xs-6 col-xs-offset-3 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                            <img src={require('../../photos/201609/IELTS.png')} className={styles.imgResponsive}/>

                            <div className={`hidden-xs ${styles.smallSpacing}`}></div>
                        </div>
                        <div className="col-xs-12">
                            <h4 className="text-center"><strong>BỐC THĂM HỖ TRỢ<br className="visible-lg"/> LỆ PHÍ THI
                                IELTS</strong></h4>
                        </div>
                    </div>
                </div>
            </div>
            {/*sharing*/}
            <a id="sharing">
                <div className={styles.largeSpacing}></div>
            </a>

            <div className={`${styles.grayBg}`}>
                <div className="container">
                    <div className={`col-xs-12 col-md-8 col-md-offset-2 text-center ${styles.sectionTitle}`}>
                        <div className={styles.smallSpacing}></div>
                        <img src={require('../../photos/201609/title-sharing.png')} className={styles.imgResponsive}/>
                    </div>
                    <div className="col-xs-12">
                        <div className="row">
                            <div className={`col-xs-12 visible-xs ${styles.noPadding}`}>
                                <img src={require('../../photos/201609/nguyen-minh-tuan.png')}
                                     className={styles.imgResponsive}/>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-lg-5 col-lg-offset-1">
                                <div className={`visible-lg ${styles.largeSpacing}`}></div>
                                <div className={`hidden-lg ${styles.smallSpacing}`}></div>
                                <h4><strong>DU HỌC SINH TẠI MỸ</strong></h4>
                                <h5 className="text-justify">Cuối cùng mình muốn nói là chuyến đi này là chuyến đi dài
                                    nhất và tốn
                                    kém nhất mình từng tham gia nên mình phảo tận dụng hết quỹ thời gian có thể để vừa
                                    học hỏi kiến
                                    thức vừa có thể thoả ước mơ đi du lịch của mình nữa. Các bạn trẻ có niềm đam mê du
                                    lịch hãy điền
                                    tên vào một chuyến đi dài ngày như mình xem sao, sẽ có rất nhiều điều hay ho phía
                                    trước đấy.</h5>

                                <div className={`visible-xs ${styles.mediumSpacing}`}></div>
                            </div>
                            <div className={`hidden-xs col-sm-6 col-lg-5 ${styles.noPadding}`}>
                                <img src={require('../../photos/201609/nguyen-minh-tuan.png')}
                                     className={styles.imgResponsive}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="row">
                            <div className={`col-xs-12 col-sm-6 col-lg-5 col-lg-offset-1 ${styles.noPadding}`}>
                                <img src={require('../../photos/201609/dang-dieu-linh.png')}
                                     className={styles.imgResponsive}/>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-lg-5">
                                <div className={`visible-lg ${styles.largeSpacing}`}></div>
                                <div className={`hidden-lg ${styles.smallSpacing}`}></div>
                                <h4><strong>DU HỌC SINH TẠI ANH</strong></h4>
                                <h5 className="text-justify">Theo mình, "Du học" là một chuyến đi mà bạn sẽ được trang
                                    bị kiến thức, gặp gỡ người mới để mở
                                    mang tầm mắt. Nó còn là cơ hội để bạn trải nghiệm cuộc sống tự lập, học hỏi nhiều
                                    điều mới và thử
                                    thách khả năng của bản thân. </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <a id="schools">
                    <div className={styles.largeSpacing}></div>
                </a>
            </div>

            {/*----------------------schools----------------------*/}
            <div className={styles.schoolsContainer}>
                <div className="container">
                    <div className="col-xs-12 col-md-8 col-md-offset-2 text-center">
                        <div className={styles.mediumSpacing}></div>
                        <img src={require('../../photos/201609/title-schools.png')} className={styles.imgResponsive}/>

                        <div className={styles.mediumSpacing}></div>
                    </div>
                    <div className={`col-xs-12 text-center ${styles.schoolsGroup}`}>
                        <h3><strong>ĐẠI DIỆN CÁC TRƯỜNG TRUNG HỌC, CAO ĐẲNG, ĐẠI HỌC<br/>
                            TẠI ANH, ÚC, CANADA, MỸ, TRUNG QUỐC, SINGAPORE</strong></h3>

                        <div className={styles.mediumSpacing}></div>
                        <SimpleSlider images={this.slider1} id='slider1_'/>

                        <div className={styles.largeSpacing}></div>
                    </div>
                    <div className={`col-xs-12 text-center ${styles.schoolsGroup}`}>
                        <h3><strong>TỔ CHỨC GIÁO DỤC STUDY GROUP<br/>
                            ĐẠI DIỆN TRƯỜNG TRUNG HỌC, ĐẠI HỌC<br/>
                            TẠI ANH, ÚC, MỸ, HÀ LAN, CANADA, NEW ZEALAND</strong></h3>

                        <div className={styles.mediumSpacing}></div>
                        <SimpleSlider images={this.slider2} id='slider2_'/>

                        <div className={styles.largeSpacing}></div>
                    </div>
                    <div className={`col-xs-12 text-center ${styles.schoolsGroup}`}>
                        <h3><strong>TỔ CHỨC GIÁO DỤC KINGS EDUCATION<br/>
                            ĐẠI DIỆN TRƯỜNG TRUNG HỌC, ĐẠI HỌC<br/>
                            TẠI ANH, MỸ</strong></h3>

                        <div className={styles.mediumSpacing}></div>
                        <SimpleSlider images={this.slider3} id='slider3_'/>

                        <div className={styles.largeSpacing}></div>
                    </div>
                    <div className={`col-xs-12 text-center ${styles.schoolsGroup}`}>
                        <h3><strong>TỔ CHỨC GIÁO DỤC SHORELIGHT<br/>
                            ĐẠI DIỆN TRƯỜNG TRUNG HỌC, ĐẠI HỌC<br/>
                            TẠI MỸ</strong></h3>

                        <div className={styles.mediumSpacing}></div>
                        <SimpleSlider images={this.slider4} id='slider4_'/>

                        <div className={styles.largeSpacing}></div>
                    </div>
                    <div className="col-xs-12 text-center">
                        <Link to="/" className={`${styles.btnBlock}`} id={`${styles.btnToForm}`} hash="#registerForm"
                              type="button"><h4>ĐĂNG KÝ</h4></Link>

                        <div className={styles.mediumSpacing}></div>
                    </div>
                </div>
            </div>

            <CallButton/>
        </div>
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
                            src={require('../../photos/201609/small-logo.png')}/></a>

                    </div>
                    <div className={`collapse navbar-collapse text-center ${styles.centerMenu}`} id="top-menu">
                        <ul className="nav navbar-nav">
                            <li><Link className={styles.customA} id="menuhome" to="/">TRANG CHỦ</Link></li>
                            <li><Link to="/" hash="#places" className={`visible-xs ${styles.customA}`}>ĐỊA ĐIỂM TRIỂN
                                LÃM</Link></li>
                            <li><Link to="/" hash="#registerForm" className={`visible-xs ${styles.customA}`}>ĐĂNG KÝ
                                THAM DỰ</Link></li>
                            <li><Link to="/" hash="#opportunities" className={styles.customA}>CƠ HỘI TẠI<br
                                className="hidden-xs hidden-lg"/> TRIỂN LÃM</Link></li>
                            <li><Link to="/" hash="#gifts" className={styles.customA}>QUÀ TẶNG</Link></li>
                            <li><Link to="/" hash="#sharing" className={styles.customA}>DU HỌC SINH<br
                                className="hidden-xs hidden-lg"/> CHIA SẺ</Link></li>
                            <li><Link to="/" hash="#schools" className={styles.customA}>CÁC TRƯỜNG TỔ CHỨC<br
                                className="hidden-xs hidden-lg"/> THAM GIA TRIỂN LÃM</Link>
                            </li>
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
})

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
                                    <p className="media-heading">043.722.4898</p>
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
                                    <p className="media-heading">043.200.4743 * 043.204.8333</p>
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
                                    <p className="media-heading">083.837.0226</p>
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
                                    <p className="media-heading">031.365.3269</p>
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
})

const CallButton = React.createClass({
	handleClickPhone(e){
		e.preventDefault()
		window.location.hash = '';
		window.location.hash = '#registerForm';
		if(ga){
			ga('send', 'event', 'Click', 'Call button');
		}
	},
    render(){
        return (<div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show hidden-xs" id="coccoc-alo-phoneIcon"
                     style={{"right": "0px", "display": "block"}}>
            <div className="coccoc-alo-ph-circle"></div>
            <div className="coccoc-alo-ph-circle-fill"></div>
            <div className="coccoc-alo-ph-img-circle"  onClick={this.handleClickPhone}></div>
        </div>)
    }
})
