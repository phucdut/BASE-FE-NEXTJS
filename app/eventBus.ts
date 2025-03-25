import mitt from "mitt";

type Events = {
  refreshAgents: void;
};

const eventBus = mitt<Events>();
export default eventBus;
