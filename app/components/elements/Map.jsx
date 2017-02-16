import React from 'react'
import DataMap from 'react-datamaps'
import _ from 'lodash'
import './Map.css'
const defaultData = {
	USA: [
		{
			name: 'Mỹ',
			schools: [
				'Tập đoàn Giáo dục Study Group',
				'Tập đoàn Giáo dục Cambridge Education Group',
				'Tập đoàn Giáo dục Kings Education',
				'Peninsula College',
				'Webster University'
			]
		}
	],
	CAN: [
		{
			name: 'Canada',
			schools: [
				'Tập đoàn Giáo dục Study Group',
				'Birmingham International Collegiate of Canada',
				'Fleming College'
			]
		}
	],
	AUS: [
		{
			name: 'Úc',
			schools: [
				'Tập đoàn Giáo dục Study Group',
				'Trường Quản lý khách sạn và Ẩm thực Le Cordon Bleu',
				'Blue Mountains International Hotel Management  School',
				'William Blue College of Hospitality Management',
				'Queensland University of Technology'
			]
		}
	],
	NZL: [
		{
			name: 'New Zealand',
			schools: [
				'Tập đoàn Giáo dục Study Group',
				'Nelson Marlborough Institute of Technology'
			]
		}
	],
	GBR: [
		{
			name: 'Vương quốc Anh',
			schools: [
				'Tập đoàn Giáo dục Study Group',
				'Tập đoàn Giáo dục Cambridge Education Group',
				'Abbey DLD Colleges',
				'Kings Education',
				'Bosworth Colleges'
			]
		},
	],
	NLD: [
		{
			name: 'Hà Lan',
			schools: [
				'Tập đoàn Giáo dục Cambridge Education Group'
			]
		}
	],
	SGP: [
		{
			name: 'Singapore',
			schools: [
				'Học viện quản lý Auston',
				'Dimensions International College',
				'Singapore Institute Management',
				'James Cook University',
				'PSB Academy'
			]
		}
	],
	CHN: [
		{
			name: 'Trung Quốc',
			schools: [
				'Blue Mountains International Hotel Management School',
				'Học bổng Chính phủ 100%'
			]
		},
	],
	MYS:[
		{
			name: 'Malaysia',
			schools: [

			]
		},
		{
			name: 'Singapore',
			schools: [
				'Học viện quản lý Auston',
				'Dimensions International College',
				'Singapore Institute Management',
				'James Cook University',
				'PSB Academy'
			]
		}
	],
	KOR: [
		{
			name: 'Hàn Quốc',
			schools: [
				'Joongbu University',
				'Sejong University',
				'Yeungnam University'
			]
		}
	],
	JPN: [
		{
			name: 'Nhật Bản',
			schools: [
				'International University of Japan',
				'Du học tại thành phố Niigata'
			]
		}
	],
	THA: [
		{
			name: 'Thái Lan',
			schools: [
				'Webster University - USA'
			]
		}
	]
};

const defaultFills = {
	fillKey: 'SRVN',
	fillColor: '#E69725'
};

export default class WorldMap extends React.Component{
	constructor(props){
		super(props)
		const dataSet = {}
		_.each(defaultData, (v, k) => {
			dataSet[k] = _.extend(v, defaultFills)
		});
		this.state = {
			data: dataSet
		}
	}

	render(){
		const _style = {
			"minHeight": "100px",
			"maxWidth": "100%"

		};
		const _geographyConfig={
			popupOnHover: true,
			borderColor: '#334752',
			borderOpacity: 0.5,
			highlightOnHover: true,
			// highlightFillColor: '#E8CF50',
			highlightFillColor: function(geo) {
				return geo['fillColor'] || '#ffffff';
			},
			popupTemplate: function(geo, data){
				if (!data) { return ; }
				return `<div>${_.map(data, (country) => {
					let index = 0
					return `<div class="hoverinfo">
					<strong>${country.name}</strong>
					<ul>
						${_.map(country.schools, (schoolName) => {
						index++
						return `<li>${index}. ${schoolName}</li>`
					}).join('')}
					</ul>
				</div>`
				}).join('')}</div>`
			}
		}
		const _fills = {
			defaultFill: '#ffffff',
			SRVN: defaultFills.fillColor
		}
		return <div style={_style} className="col-xs-12 map_container">
			<DataMap data={this.state.data} responsive geographyConfig={_geographyConfig} fills={_fills}/>
		</div>
	}
}