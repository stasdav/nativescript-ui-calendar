export default {
    props: {},
    template: `
      <NativeRadCalendar
        ref="calendar"
        v-bind="$attrs"
        v-on="$listeners">
        <slot />
      </NativeRadCalendar>
    `,
    methods: {
        navigateForward() {
            this.$refs.calendar.nativeView.navigateForward();
        },
        navigateBack() {
            this.$refs.calendar.nativeView.navigateBack();
        },
        goToDate(date) {
            this.$refs.calendar.nativeView.goToDate(date);
        }
    }
};
//# sourceMappingURL=component.js.map