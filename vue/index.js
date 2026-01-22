import { RadCalendar } from './..';
import RadCalendarComp from './component';
const RadCalendarPlugin = {
    install(Vue) {
        Vue.registerElement('RadCalendar', () => RadCalendar, {
            component: RadCalendarComp
        });
    }
};
export default RadCalendarPlugin;
//# sourceMappingURL=index.js.map