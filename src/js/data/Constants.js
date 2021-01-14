class Constants
{
    static get APP_VERSION() { return "0.1"}; 
    static get APP_SIZE(){ return [1024,768]};
    static get APP_RATIO(){ return this.APP_SIZE[0]/this.APP_SIZE[1]};
}

export default Constants