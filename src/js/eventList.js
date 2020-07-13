'use strict';

const createEventTemplate = (obj) => {
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


  export default class EventList {
    constructor(container, eventList) {
     
        this._eventList = eventList;
        this._container = container;
  
        this.addItems(eventList);
      }
      
      clearList(){
          this._container.innerHTML = '';
          this._eventList = null;
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
     

  } 