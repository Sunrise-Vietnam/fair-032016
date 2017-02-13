import React from 'react'
import DataMap from 'react-datamaps'
import _ from 'lodash'
import './Map.css'
const defaultData = {
	USA: {
		name: 'Mỹ',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	CAD: {
		name: 'Canada',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	AUS: {
		name: 'Úc',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	GBR: {
		name: 'Vương quốc Anh',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	SGP: {
		name: 'Singapore',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	CHN: {
		name: 'Trung Quốc',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	MYS:{
		name: 'Malaysia',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	KOR: {
		name: 'Hàn Quốc',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	JPN: {
		name: 'Nhật Bản',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	},
	PHL:{
		name: 'Philipin',
		schools: [
			'Study Group',
			'CEG',
			'Auston Singapore',
			'Blue Mountain China',
			'Joongbu University',
			'Dimension'
		]
	}
}

const defaultFills = {
	fillKey: 'SRVN',
	fillColor: '#02386F'
}

export default class WorldMap extends React.Component{
	constructor(props){
		super(props)
		const dataSet = {}
		_.each(defaultData, (v, k) => {
			dataSet[k] = _.extend(v, defaultFills)
		})
		this.state = {
			data: dataSet
		}
	}

	render(){
		const _style = {
			"minHeight": "586px",
			"height": "586px",
		}
		const _geographyConfig={
			popupOnHover: true,
			highlightOnHover: true,
			highlightFillColor: function(geo) {
				return geo['fillColor'] || '#ffffff';
			},
			popupTemplate: function(geo, data){
				if (!data) { return ; }
				let index = 0
				return `<div class="hoverinfo">
					<strong>${data.name}</strong>
					<ul>
						${_.map(data.schools, (schoolName) => {
							index++
							return `<li>${index}. ${schoolName}</li>`
						}).join('')}
					</ul>
				</div>`
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