import React from 'react';
import {Link} from 'react-router';
import Modal from 'react-bootstrap-modal';
import _ from 'underscore';
import DDP from 'ddp.js';


const _formObj = {
    isOpenModal: false,
    hovaten: '',
    sodienthoai: '',
    email: '',
    nguoidangkyla: '',
    thanhphodangsong: '',
    thamdutai : '',
    duhoctai: [],
    thoigianduhoc: '',
    nhucauhoc: '',
    bietchuongtrinhquakenh: []
}

const _eventCode = 'Pk-FuP2cdvZDGopoPvnDAdLZDuhVCO29Cnv5s3ekeWN';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = _.clone(_formObj);

        this._openModal = this._openModal.bind(this);
        this._handle_Hovaten = this._handle_Hovaten.bind(this);
        this._handle_Sodienthoai = this._handle_Sodienthoai.bind(this);
        this._handle_Email = this._handle_Email.bind(this);
        this._handle_Thamdutai = this._handle_Thamdutai.bind(this);
        this._handle_Nguoidangkyla = this._handle_Nguoidangkyla.bind(this);
        this._handle_Thanhphodangsong = this._handle_Thanhphodangsong.bind(this);
        this._handle_Nhucauhoc = this._handle_Nhucauhoc.bind(this);
        this._handle_Thoigianduhoc = this._handle_Thoigianduhoc.bind(this);
        this._handle_Chuongtrinh = this._handle_Chuongtrinh.bind(this);
        this._handle_Bietchuongtrinhquakenh = this._handle_Bietchuongtrinhquakenh.bind(this);
        this._saveAndCloseModal = this._saveAndCloseModal.bind(this);
    }

    _openModal() {
        this.setState({
            isOpenModal: true
        })
        //this.props.history.pushState(null, "/thanks-you")
    }

    _saveAndCloseModal() {
        if (this._isFormValid()) {
            let params = {
                eventCode: _eventCode,
                obj: _.omit(this.state, 'isOpenModal')
            }
            let self = this;
            let msgId = this.ddp.method('registerEventGLVH', [params.eventCode, params.obj]);
            this.ddp.on('result', function (msg) {
                if (msgId === msg.id && !msg.error) {
                    self.setState(_.clone(_formObj));
                    self.props.history.pushState(null, "/thanks-you")
                }
            })
        }
    }

    _resetForm() {
        $('.selectpicker').selectpicker('deselectAll');
    }

    _handle_Hovaten(e) {
        this.setState({
            hovaten: e.target.value
        })
    }

    _handle_Sodienthoai(e) {
        this.setState({
            sodienthoai: e.target.value
        })
    }

    _handle_Email(e) {
        this.setState({
            email: e.target.value
        })
    }

    _handle_Nguoidangkyla(e) {
        this.setState({
            nguoidangkyla: e.target.value
        })
    }
    _handle_Thamdutai(e) {
        this.setState({
            thamdutai: e.target.value
        })
    }

    _handle_Chuongtrinh(e) {
        this.setState({
            duhoctai: $(e.target).selectpicker('val')
        })
    }

    _handle_Thanhphodangsong(e) {
        this.setState({
            thanhphodangsong: e.target.value
        })
    }

    _handle_Thoigianduhoc(e) {
        this.setState({
            thoigianduhoc: e.target.value
        })
    }

    _handle_Nhucauhoc(e) {
        this.setState({
            nhucauhoc: e.target.value
        })
    }

    _handle_Bietchuongtrinhquakenh(e) {
        this.setState({
            bietchuongtrinhquakenh: $(e.target).selectpicker('val')
        })
    }

    _isFormValid() {
        let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (this.state.hovaten && regEmail.test(this.state.email) && this.state.sodienthoai && this.state.thamdutai && this.state.duhoctai && this.state.nguoidangkyla && this.state.thanhphodangsong && this.state.thoigianduhoc && this.state.nhucauhoc && this.state.duhoctai.length > 0 && this.state.bietchuongtrinhquakenh.length > 0);
    }

    componentDidMount() {
        let options = {
            endpoint: "ws://system.sunrisevietnam.com/websocket",
            SocketConstructor: WebSocket
        };
        this.ddp = new DDP(options);
        this.ddp.on("connected", function () {
            console.log("Connected to Server...");
        });
    }

    componentDidUpdate() {
        if (this.state.isOpenModal && this.state.isOpenModal === true) {
            var self = this;
            $('.selectpicker').selectpicker().on('loaded.bs.select', function (e) {
                if (e.target.id === 'chuongtrinh') {
                    $(e.target).selectpicker('val', self.state.duhoctai);
                } else {
                    $(e.target).selectpicker('val', self.state.bietchuongtrinhquakenh);
                }
            });
        }
    }

    render() {
        let closeModal = () => this.setState({isOpenModal: false});
        let _disabled = {};
        if (!this._isFormValid()) {
            _disabled['disabled'] = 'disabled';
        }
        return <div>
            <Header/>
            <Main openModal={this._openModal}/>
            <Footer/>
            <Modal show={this.state.isOpenModal} onHide={closeModal} aria-labelledby="ModalHeader"
                   backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'>ĐĂNG KÝ THAM DỰ <span className="subTitle">Xin nhập/chọn đầy đủ thông tin</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form data-toggle="validator" role="form" id="dangkyform" className="form-horizontal">
                        <div className="form-group">
                            <div className="col-xs-12">
                                <div className="input-group">
                                    <input aria-describedby="hvt" type="text" className="form-control dblue"
                                           id="hovaten" placeholder="Họ và tên" onChange={this._handle_Hovaten}
                                           value={this.state.hovaten}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12">
                                <div className="input-group">
                                    <select id="thamdutai" className="form-control dblue"
                                            onChange={this._handle_Thamdutai} value={this.state.thamdutai}>
                                        <option defaultValue value="">Bạn sẽ tham dự triển lãm tại</option>
                                        <option value="Hà Nội">Hà Nội - Thứ 7 từ 13h - 17h30 ngày 19/03/2016 tại Star Galaxy Convention, 87 Láng Hạ - Đống
                                            Đa</option>
                                        <option value="Hải Phòng">Hải Phòng - Chủ Nhật từ 8h - 12h30 ngày 20/03/2016 tại khách sạn Nam Cường 47 Lạch Tray</option>
                                        <option value="TP HCM">TP.HCM - Thứ 6 từ 15h - 19h30 ngày 18/03/2016 tại Khách sạn Liberty Central Saigon, 59 - 61
                                            Pasteur - Quận 1</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-sm-6 marginbottom">
                                <div className="input-group">
                                    <input type="text"
                                           maxLength="14" className="form-control dblue" id="sodt"
                                           placeholder="Số điện thoại" onChange={this._handle_Sodienthoai}
                                           value={this.state.sodienthoai}/>
                                </div>
                                <div className="smallspace visible-xs"></div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="input-group">
                                    <input aria-describedby="email" type="text"
                                           className="form-control dblue" id="dcemail"
                                           placeholder="Địa chỉ Email" onChange={this._handle_Email}
                                           value={this.state.email}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-xs-12 col-sm-6 marginbottom">
                                <div className="input-group">
                                    <select id="danhtinh" className="form-control dblue"
                                            onChange={this._handle_Nguoidangkyla} value={this.state.nguoidangkyla}>
                                        <option defaultValue value="">Bạn là</option>
                                        <option value="Học sinh THPT">Học sinh THPT</option>
                                        <option value="Học sinh THCS">Sinh viên Đại học</option>
                                        <option value="Học sinh THCS">Đã tốt nghiệp</option>
                                        <option value="Phụ huynh">Phụ huynh</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div className="smallspace visible-xs"></div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="input-group">
                                    <select id="diachi" className="form-control dblue"
                                            onChange={this._handle_Thanhphodangsong}
                                            value={this.state.thanhphodangsong}>
                                        <option defaultValue value="">Nơi bạn đang sống</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="TP HCM">TP HCM</option>
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
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-sm-6 marginbottom">
                                <div className="input-group">
                                    <select id="chuongtrinh" className="form-control selectpicker dblue"
                                            title="Bạn dự định du học tại" multiple
                                            data-selected-text-format="count>1" mobile="true"
                                            onChange={this._handle_Chuongtrinh}>
                                        <option value="Anh">Anh</option>
                                        <option value="Mỹ">Mỹ</option>
                                        <option value="Úc">Úc</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Phần Lan">Phần Lan</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Thái Lan">Thái Lan</option>
                                        <option value="Thuỵ Sỹ">Thuỵ Sỹ</option>
                                        <option value="Hà Lan">Hà Lan</option>
                                        <option value="Newzealand">New Zealand</option>
                                        <option value="Đức">Đức</option>
                                        <option value="Ý">Ý</option>
                                        <option value="Hàn Quốc">Hàn Quốc</option>
                                        <option value="Nhật bản">Nhật bản</option>
                                        <option value="Trung Quốc">Trung quốc</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div className="smallspace visible-xs"></div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="input-group">
                                    <select id="tgduhoc" className="form-control dblue"
                                            onChange={this._handle_Thoigianduhoc} value={this.state.thoigianduhoc}>
                                        <option defaultValue value="">Thời gian dự định du học</option>
                                        <option value="Kỳ xuân 2016">Kỳ hè 2016</option>
                                        <option value="Kỳ thu 2016">Kỳ thu 2016</option>
                                        <option value="Kỳ xuân 2017">Kỳ xuân 2017</option>
                                        <option value="Kỳ xuân 2017">Kỳ hè 2017</option>
                                        <option value="Kỳ thu 2017">Kỳ thu 2017</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-12 col-sm-6 marginbottom">
                                <div className="input-group">
                                    <select id="nhucau" className="form-control dblue"
                                            onChange={this._handle_Nhucauhoc} value={this.state.nhucauhoc}>
                                        <option defaultValue value="">Bạn có nhu cầu học
                                        </option>
                                        <option value="IELTS">IELTS</option>
                                        <option value="TOEFL">TOEFL</option>
                                        <option value="SAT">SAT</option>
                                        <option value="GMAT">GMAT</option>
                                        <option value="Không">Không</option>
                                    </select>
                                </div>
                                <div className="smallspace visible-xs"></div>
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <div className="input-group">
                                    <select multiple="multiple" className="form-control selectpicker dblue"
                                            name="kenh[]" id="kenh" title="Bạn biết chương trình này qua kênh"
                                            data-selected-text-format="count>1" mobile="true"
                                            onChange={this._handle_Bietchuongtrinhquakenh}>
                                        <option value="Facebook SunriseVietnam">Facebook SunriseVietnam</option>
                                        <option value="Website SunriseVietnam">Website SunriseVietnam</option>
                                        <option value="Truyền hình Hải Phòng">Truyền hình Hải Phòng</option>
                                        <option value="Email">Email</option>
                                        <option value="Google">Google</option>
                                        <option value="Băng rôn">Băng rôn</option>
                                        <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
                                        <option value="Dân trí">Dân trí</option>
                                        <option value="CLB trong trường">CLB trong trường</option>
                                        <option value="VnExpress">VnExpress</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn dbluebg white" id="dkbtn" {..._disabled}
                            onClick={this._saveAndCloseModal}>Gửi đăng ký
                    </button>
                    <button type="reset" className="btn whitebg dred" onClick={this._resetForm}>Làm Lại</button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}

const Main = React.createClass({
    displayName: 'Main',
    _openModal(){
        //console.log('open modal...');
        this.props.openModal();
    },
    render(){
        return <div>
            <div className="headbanner"><img width="100%" src={require("../../photos/banner.png")}/></div>
            <div className="container-fluid bgmblue">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 smallspace"></div>
                        <div className="col-sm-6 hidden-xs center-block">
                            <img className="img-responsive" id="imgfair" src={require("../../photos/fair-intro.png")}/>
                            <button type="button" className="center-block btn btn-reg bgorange white" id="btn-intro" onClick={this._openModal}><h2
                                className="semibold">ĐĂNG KÝ NGAY</h2></button>
                        </div>
                        <div className="col-xs-12 col-sm-5 col-sm-offset-1">
                            <p className="semibold text-justify">Tham gia Triển lãm THẾ GIỚI DU HỌC để được gặp gỡ đại
                                diện tuyển sinh của 70 trường Trung học, Đại học từ Anh, Úc, Mỹ, Canada, Hà Lan, Thụy
                                Sỹ, Trung Quốc, Nhật Bản tìm hiểu cơ hội học bổng, làm việc định cư và 100% nhận các
                                phần quà hấp dẫn.</p>

                            <p className="bold"><i>* TP.HCM:</i></p>

                            <p>Thứ 6 từ 15h - 19h30 ngày 18/03/2016 tại Khách sạn Liberty Central Saigon, 59 - 61
                                Pasteur - Quận 1</p>
                            <hr className="bgorange"/>
                            <p className="bold"><i>* HÀ NỘI:</i></p>

                            <p>Thứ 7 từ 13h - 17h30 ngày 19/03/2016 tại Star Galaxy Convention, 87 Láng Hạ - Đống
                                Đa<br/><span className="size16">(Cạnh rạp chiếu phim Quốc gia - Hà Nội)</span></p>
                            <hr className="bgorange"/>
                            <p className="bold"><i>* HẢI PHÒNG:</i></p>

                            <p>Chủ Nhật từ 8h - 12h30 ngày 20/03/2016 tại khách sạn Nam Cường 47 Lạch Tray</p>
                        </div>
                        <div className="col-xs-12">
                            <button type="button" className="visible-xs center-block btn btn-reg bgorange white"
                                    onClick={this._openModal}><h2 className="semibold">ĐĂNG KÝ NGAY</h2></button>
                        </div>
                    </div>
                </div>
                <div className="space hidden-sm"></div>
                <div className="smallspace visible-sm"></div>
                <div id="bannerborder"></div>
                <a name="cohoi" id="cohoi"></a>

                <div>
                    <img id="bottomintro" src={require("../../photos/bottombanner.png")}/>
                </div>
            </div>
            <div className="smallspace"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-1 col-sm-2 hidden-xs"><h1 className="text-right"><img
                        src={require("../../photos/arrow.png")}/></h1></div>
                    <div className="col-xs-12 col-sm-8">
                        <h1 className="orange text-center semibold">CƠ HỘI TẠI<br className="visible-xs"/> TRIỂN LÃM
                        </h1>
                    </div>
                    <div className="col-xs-1 col-sm-2 hidden-xs"><h1><img src={require("../../photos/arrow.png")}/></h1>
                    </div>
                    <div className="col-xs-12 smallspace"></div>
                    <div className="col-xs-10 col-xs-offset-1">
                        <div className="btn-reg bgmblue white"><p className="text-center"><span
                            className="size25 semibold">GẶP ĐẠI DIỆN TUYỂN SINH: </span><br className="visible-xs"/>XÉT
                            HỒ SƠ DU HỌC, TƯ VẤN VIP <br className="visible-xs"/>TỪ A ĐẾN Z</p></div>
                        <div className="smallspace"></div>
                    </div>
                    <div className="col-xs-10 col-xs-offset-1">
                        <div className="btn-reg bgmblue white"><p className="text-center"><span
                            className="size25 semibold">HỘI THẢO CHUYÊN ĐỀ: </span><br className="visible-xs"/>CHIA SẺ
                            CỦA DU HỌC SINH, <br className="visible-xs"/>DỊCH VỤ NGÂN HÀNG</p></div>
                        <div className="smallspace"></div>
                    </div>
                    <div className="col-xs-10 col-xs-offset-1">
                        <div className="btn-reg bgmblue white"><p className="text-center size25 semibold">ĐĂNG KÝ HỌC
                            BỔNG DU HỌC <br className="visible-xs"/>VÀ THI THỬ IELTS, TOEFL, SAT</p></div>
                        <div className="smallspace"></div>
                    </div>
                </div>
            </div>
            <a name="qua" id="qua">
                <div className="space"></div>
            </a>

            <div className="container-fluid gifts">
                <div className="container">
                    <div className="row">
                        <div className="smallspace"></div>
                        <div className="col-xs-1 hidden-xs"><h1 className="text-right"><img
                            src={require("../../photos/white-arrow.png")}/></h1></div>
                        <div className="col-xs-12 col-sm-10">
                            <h1 className="text-center semibold">100% THAM DỰ TRIỂN LÃM<br/>NHẬN NGAY</h1>
                        </div>
                        <div className="col-xs-1 hidden-xs"><h1><img src={require("../../photos/white-arrow.png")}/>
                        </h1></div>
                        <div className="col-xs-12 smallspace"></div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-3">
                            <div className="thumbnail">
                                <img src={require("../../photos/gift1.png")}/>

                                <div className="caption">
                                    <p className="white">Túi, sổ, bút,<br/>móc khóa</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-3">
                            <div className="thumbnail">
                                <img src={require("../../photos/gift2.png")}/>

                                <div className="caption">
                                    <p className="white">Cẩm nang <br className="visible-xs"/>du học</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-3">
                            <div className="thumbnail">
                                <img src={require("../../photos/gift3.png")}/>

                                <div className="caption">
                                    <p className="white">Vé xem phim CGV</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-3">
                            <div className="thumbnail">
                                <img src={require("../../photos/gift4.png")}/>

                                <div className="caption">
                                    <p className="white">Tặng gói tư vấn<br/> du học trọn đời</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-3 col-sm-offset-2">
                            <div className="thumbnail">
                                <img src={require("../../photos/gift5.png")}/>

                                <div className="caption">
                                    <p className="white">Vé máy bay 1 chiều *<br/>(Khi ký hợp đồng<br/> ngay tại triển
                                        lãm)</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-3 col-sm-offset-2">
                            <div className="thumbnail">
                                <img src={require("../../photos/gift6.png")}/>

                                <div className="caption">
                                    <p className="white">Bốc thăm hỗ trợ<br/>lệ phí thi IELTS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <button type="button" className="center-block btn btn-reg bgorange white"
                                    onClick={this._openModal}><h2 className="semibold">ĐĂNG KÝ NGAY</h2></button>
                        </div>
                    </div>
                </div>
                <a name="diengia" id="diengia">
                    <div className="space"></div>
                </a>
            </div>
            <div className="smallspace"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-1 col-sm-2 hidden-xs"><h1 className="text-right"><img
                        src={require("../../photos/arrow.png")}/></h1></div>
                    <div className="col-xs-12 col-sm-8">
                        <h1 className="text-center semibold orange">DIỄN GIẢ TẠI TRIỂN LÃM</h1>
                    </div>
                    <div className="col-xs-1 col-sm-2 hidden-xs"><h1><img src={require("../../photos/arrow.png")}/></h1>
                    </div>
                    <div className="col-xs-12 smallspace"></div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-4 col-md-offset-1">
                        <div className="thumbnail">
                            <img src={require("../../photos/diengia1.png")}
                                 className="img-responsive img-circle img-diengia img-diengia1"/>

                            <div className="caption">
                                <h3 className="mblue bold">HƯNG TRẦN</h3>

                                <p className="semibold black">Cử nhân kinh tế Đại học<br/>Cambridge (Anh)</p>

                                <p className="semibold black">Thạc sĩ chính sách quốc tế từ<br/>Đại học Stanford (Mỹ)
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-md-offset-2">
                        <div className="thumbnail">
                            <img src={require("../../photos/diengia2.png")}
                                 className="img-responsive img-circle img-diengia img-diengia2"/>

                            <div className="caption">
                                <h3 className="mblue bold">LÊ THỊ XUÂN</h3>

                                <p className="semibold black">Thạc sĩ</p>

                                <p className="semibold black">Đại học Huddersfield (Anh)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a name="chiase" id="chiase">
                <div className="space"></div>
            </a>

            <div className="container-fluid bglblue">
                <div className="container">
                    <div className="row row-chiase">
                        <div className="col-xs-12 space"></div>
                        <div className="col-xs-12 visible-xs">
                            <h1 className="semibold text-center">CHIA SẺ CỦA DU HỌC SINH<br/>SUNRISE VIETNAM</h1>
                        </div>
                        <div className="col-xs-12 col-sm-5 col-md-4 col-md-offset-1">
                            <h2><img src={require("../../photos/chiase1.png")} className="img-responsive chiaseimg"/>
                            </h2>
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-6">
                            <h2 className="semibold hidden-xs"><img
                                src={require("../../photos/white-arrow.png")}/>&nbsp;&nbsp; CHIA SẺ CỦA DU HỌC SINH<br/>SUNRISE
                                VIETNAM</h2>

                            <div className="smallspace"></div>
                            <p className="text-justify">Trước khi đi du học, em cũng có nhiều điều bỡ ngỡ trong việc làm
                                thủ tục, tuy
                                nhiên rất may mắn vì được các anh chị và nhất là cô Hương ở trung tâm Sunrise hướng dẫn
                                chu đáo nên
                                em và bố mẹ cũng cảm thấy yên tâm hơn. Trong suốt 2 năm vừa qua, bố mẹ em cũng nắm bắt
                                rõ tình hình
                                học tập sinh hoạt của em qua các báo cáo nhận xét mỗi kì của trường gửi về qua trung
                                tâm.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 smallspace"></div>
                        <div className="col-xs-12 visible-xs">
                            <h2><img src={require("../../photos/chiase2.png")}
                                     className="img-responsive chiaseimg chiase2"/></h2>
                        </div>
                        <div className="col-xs-12 col-sm-7 col-md-6 col-md-offset-1">
                            <div className="space"></div>
                            <p className="text-justify">Theo mình "Du học" là một chuyến đi mà bạn sẽ được trang bị kiến
                                thức, gặp gỡ người mới để mở mang tầm mắt. Nó còn là cơ hội để bạn trải nghiệm cuộc sống
                                tự lập học hỏi nhiều điều mới và thử thách khả năng của bản thân.</p>

                            <div className="smallspace"></div>
                            <button type="button" className="center-block btn btn-reg bgorange white"
                                    onClick={this._openModal}><h2 className="semibold">ĐĂNG KÝ NGAY</h2></button>
                        </div>
                        <div className="col-sm-5 col-md-4 hidden-xs">
                            <h2 className="text-right"><img src={require("../../photos/chiase2.png")}
                                                            className="img-responsive chiase2"/></h2>
                        </div>
                    </div>
                </div>
                <a name="danhsach" id="danhsach">
                    <div className="space"></div>
                </a>
            </div>
            <div className="smallspace"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-2 hidden-xs"><h1 className="text-righ"><img
                        src={require("../../photos/arrow.png")}/></h1></div>
                    <div className="col-xs-12 col-sm-8">
                        <h1 className="orange text-center semibold">DANH SÁCH CÁC TRƯỜNG <br/>TỔ CHỨC THAM GIA</h1>
                    </div>
                    <div className="col-xs-2 hidden-xs"><h1><img src={require("../../photos/arrow.png")}/></h1></div>
                    <div className="col-xs-12 smallspace"></div>
                    <div className="col-xs-12">
                        <img width="100%" src={require("../../photos/uni.png")}
                             className="img-responsive center-block"/>
                    </div>
                    <div className="col-xs-12">
                        <div className="smallspace"></div>
                        <button type="button" className="center-block btn btn-reg bgorange white"
                                onClick={this._openModal}><h2 className="semibold">ĐĂNG KÝ NGAY</h2></button>
                        <div className="smallspace"></div>
                    </div>
                    <div className="col-xs-12 text-center semibold">
                        <h3 className="size40 orange">CHÚNG TÔI CHỜ ĐÓN BẠN <br className="visible-xs"/>TẠI TRIỂN LÃM!
                        </h3>

                        <div className="space"></div>
                    </div>
                </div>
            </div>
        </div>
    }
})

const Header = React.createClass({
    displayName: 'Header',
    componentDidMount(){
        $(window).scroll(function(){
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
        return <header className="container-fluid bgdblue menu">
            <div className="container">
                <nav className="navbar navbar-default menubar">
                    <div className="container-fluid bgdblue">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#smallmenu" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar bgwhite"></span>
                                <span className="icon-bar bgwhite"></span>
                                <span className="icon-bar bgwhite"></span>
                            </button>
                            <a className="navbar-brand" href="#"><img src={require("../../photos/logo.png")}/></a>
                        </div>
                        <div className="collapse navbar-collapse white" id="smallmenu">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link className="white" id="menuhome" to="/">Trang Chủ</Link></li>
                                <li><Link className="white" id="menucohoi" hash="#cohoi" to="/">Cơ Hội<br
                                    className="hidden-xs"/>
                                    Tại Triển Lãm</Link></li>
                                <li><Link className="white" id="menuqua" hash="#qua" to="/">Quà Tặng<br
                                    className="hidden-xs"/></Link></li>
                                <li><Link className="white" id="menudg" hash="#diengia" to="/">Diễn Giả</Link></li>
                                <li><Link className="white" id="menucs" hash="#chiase" to="/">Chia Sẻ Của<br
                                    className="hidden-xs"/> Du Học Sinh</Link></li>
                                <li><Link className="white" id="menuds" hash="#danhsach" to="/">Các Trường/ Tổ Chức<br
                                    className="hidden-xs"/> Tham Gia</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    }
})

const Footer = React.createClass({
    displayName: 'Footer',
    render(){
        return (
            <footer className="container-fluid bgddblue">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 space"></div>
                        <div className="col-sm-4 col-sm-offset-8 hidden-xs"><img className="img-responsive" id="bg-logo"
                                                                                 src={require("../../photos/footerlogo.png")}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <h4 className="bold">TRỤ SỞ CHÍNH SUNRISE VIETNAM</h4>

                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/adicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p className="text-uppercase">86 Cửa Bắc - Ba Đình - Hà Nội</p>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/phoneicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p>TEL: (84-4) 37224878 - 37224898</p>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/printicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p>FAX: (84-4) 37224855</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-4 col-lg-3">
                            <h4 className="bold">VĂN PHÒNG HẢI PHÒNG</h4>

                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/adicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p className="text-uppercase">29 Nguyễn Trãi - Ngô Quyền</p>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/phoneicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p>TEL: (84-31) 2640689 - 3653269</p>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/printicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p>FAX: (84-31) 3732895</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-4 col-lg-5">
                            <h4 className="bold">VĂN PHÒNG HỒ CHÍ MINH</h4>

                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/adicon.png")}/>
                                </div>
                                <div className="media-body">
                                    <p className="text-uppercase">Lầu 7, Tòa nhà Thanh Dung, số 179 Nguyễn Cư Trinh,
                                        Q.1</p>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/phoneicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p>TEL: (84-8) 38370176 - 38370226</p>
                                </div>
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <img className="media-object" src={require("../../photos/printicon.png")}/>
                                </div>
                                <div className="media-body media-middle">
                                    <p>FAX: (84-8) 38360940</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 smallspace"></div>
                        <div className="col-xs-12 col-sm-4">
                            <a className="white" href="http://sunrisevietnam.com"
                               target="_blank">www.sunrisevietnam.com</a>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-lg-3">
                            <p>Email: <a className="white" href="mailto:info@sunrisevietnam.com" target="_blank">info@sunrisevietnam.com</a>
                            </p>
                        </div>
                        <div className="col-xs-12 col-sm-4 col-lg-5">
                            <p>Facebook: <a className="white" href="http://fb.com/thaiduong.vietnam" target="_blank">www.facebook.com/thaiduong.vietnam</a>
                            </p>
                        </div>
                        <div className="col-xs-12 space"></div>
                    </div>


                </div>
            </footer>
        )
    }
})
