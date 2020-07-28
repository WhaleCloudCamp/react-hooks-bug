type Subscription<T> = (val: T) => void;
class EventEmitter<T> {
    private subscriptions: { (arg0: T): void; (val: T): void; } | undefined;

    emit = (val: T) => {
        //@ts-ignore
        this.subscriptions(val);
    };

    useSubscription = (callback: Subscription<any>) => {
        function subscription(val: T) {
            if (callback) {
                callback(val);
            }
        }
        this.subscriptions = subscription;
    };
}
const layoutEmitter = new EventEmitter();
export { layoutEmitter };
