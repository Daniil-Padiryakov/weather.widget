import {mount} from "@vue/test-utils";
import WeatherWidget from '../../ui/WeatherWidget.ce.vue'
import WeatherSettings from '../../ui/WeatherSettings.ce.vue'
import WeatherItem from '../../ui/WeatherItem.ce.vue'
import {WeatherInfoI} from "../../domain/WeatherInfo";

describe('Weather Widget ce', () => {
    let wrapper: any;

    const findButtonByText = (text: string) =>
        wrapper.findAll("button").find((w: any) => w.text() === text);

    const createComponent = () => {
        wrapper = mount(WeatherWidget, {
            data() {
                return {
                    weatherInfo: [{"id":499099,"order":1,"city":"Samara","country":"RU","temp":10.64,"tempFeels":9.46,"weatherDesc":"overcast clouds","windSpeed":3.52,"pressure":1018,"humidity":65,"grndLevel":1015,"visibility":10000}] as WeatherInfoI[],
                    isSettingsOpen: false,
                }
            },
        });
    }


    afterEach(() => {
        wrapper.unmount();
    })

    it('show WeatherItem', async () => {
        createComponent();
        expect(wrapper.findComponent(WeatherItem).exists()).toBe(true);
    })

    it('when click Settings button hide it',async () => {
        createComponent();
        await findButtonByText('Settings').trigger('click');
        expect(findButtonByText('Settings')).toBe(undefined);
    })

    it('when click Settings button show WeatherSettings', async () => {
        createComponent();
        await findButtonByText('Settings').trigger('click');

        expect(wrapper.findComponent(WeatherSettings).exists()).toBe(true);
    })
})
