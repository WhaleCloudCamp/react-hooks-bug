type Subscription<T> = (val: any) => void;
class EventEmitter<T> {
    private subscriptions: { (arg0: any): void; (val: any): void; } | undefined;

    emit = (val: any) => {
        //@ts-ignore
        this.subscriptions(val);
    };

    useSubscription = (callback: Subscription<T>) => {
        function subscription(val: any) {
            if (callback) {
                callback(val);
            }
        }
        this.subscriptions = subscription;
    };
}
const layoutEmitter = new EventEmitter();
export { layoutEmitter };
