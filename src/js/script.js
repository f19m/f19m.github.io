'use strict';

let comboCity=document.querySelector('#filter_city'),
    comboMonth=document.querySelector('#filter_month'),
    eventsBox=document.querySelector('#events_box'),
    arrMonth=["All", "January","February","March","April","May","June","July","August","September","October","November","December"],
    dataMonth=[],
    dataCity=[],
    dataEvent={},
    eventList={};

function createEventTemplate (obj){
    let dtArr= obj.date.split('.'),
        dt = new Date(dtArr[1]+'/'+dtArr[0]+'/'+dtArr[2]);
   

    return (
    `  <div class="event_info__header info_head">
            <div class="info_head__date">
                <time datetime="${dt.toISOString()}">${dt.getDate()}</time>
            </div>

            <div class="info_head__save">
                <span>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 14L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>
      </div>
      <div class="event_info__text">${obj.city}</div>`
    );
  };


class EventList {
    constructor(container, eventList) {
     
      this._eventList = eventList;
      this._container = container;
      this.addItems(eventList);
    }
    
    clearList(){
        this._container.innerHTML = '';
    }
    
    addItems(eventList){
        this.clearList();
        eventList.forEach(event => {
            const el = document.createElement('div');
            el.innerHTML=createEventTemplate(event);
            el.classList.add('events_box__event');
            el.classList.add('event_info');
            el.id='event-'+event.id;
            el.style.backgroundImage=`url(${event.image})`;

            this._container.appendChild(el);
        });
    }

    doFilter(city, month){
        this.clearList();
        let arr=this._eventList.filter(obj => ((obj.city==dataCity[city] && city > 0  || city==0 ) && (obj.month==month && month > 0  || month==0 )));
        this.addItems(arr);
    }
   

  }

function send_req(){
    console.log('send_req');
    let req = new XMLHttpRequest();

    req.open('GET', 'data/events.json')
    req.setRequestHeader('Content-type','application/json; charset=utf-8');
    req.send();

    req.addEventListener('readystatechange', function(){
        if (req.readyState === 4 && req.status == 200){
            dataEvent = JSON.parse(req.response);
            console.log(dataEvent);
            
            let citySet = new Set();
            citySet.add('All');
            dataMonth.push('All');
            dataEvent.forEach(element => {
                citySet.add(element.city);

                element.month = +element.date.split('.')[1];
                dataMonth[element.month] = arrMonth[element.month];
            });
            dataCity = Array.from(citySet);

            fillCombo(comboCity, dataCity);
            fillCombo(comboMonth, dataMonth);

            eventList = new EventList(eventsBox, dataEvent);
            console.log('eventList='+eventList);
        }
    });
}

function fillCombo(elem, data){
    elem.innerHTML = data.map((val, idx) => `<option value="${idx}">${val}</option>`).join('');
};



comboCity.addEventListener('change', event =>{
    let idx = event.target.value;
    eventList.doFilter(idx, comboMonth.selectedIndex)
})

comboMonth.addEventListener('change', event =>{
    let idx = event.target.value;
    eventList.doFilter(comboCity.selectedIndex, idx)
})


window.addEventListener('DOMContentLoaded', function(){
    send_req();
 });