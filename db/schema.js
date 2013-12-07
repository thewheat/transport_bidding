var mongo = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment');
var dbconf = require('../conf/dbconf.js');

mongo.connect('mongodb://' + dbconf.mongoUrl);

autoIncrement.initialize(mongo);

var LatLon = {
  lat: Number,
  lon: Number
};

var Package = new mongo.Schema({
  timestamp: {type: Date, default: Date.now},
  supplier_name: String,
  supplier_suburb: String,
  supplier_postcode: String,
  supplier_address: String,
  distributor_name: String,
  distributor_suburb: String,
  distributor_postcode: String,
  distributor_address: String,
  product_name: String,
  variant: String,
  variant_weight: Number,
  quantity: Number,
  reserve: Number,
  supply_address: String,
  delivery_address: String,
  shipping_instructions: String,
  supply_lat_lon: LatLon,
  delivery_lat_lon: LatLon,
  is_active: { type: Boolean, default: true }
});

var TransportCycle = new mongo.Schema({
  transport_cycle_coordinator_id: String,
  start_date: Date,
  end_date: Date,
  package_list: [Package],
  is_active: { type: Boolean, default: true }
});

var TransportCycleCoordinator = new mongo.Schema({
  first_name: String,
  last_name: String,
  organisation_name: String,
  email: String,
  mobile: String,
  phone: String,
  address: String
});

var Bid = new mongo.Schema({
  package_id: String,
  bidder_name: String,
  bidder_email: String,
  bidder_mobile: String,
  comments: String,
  value: Number,
  ts: Date
});

TransportCycle.plugin(autoIncrement.plugin, { model: "transport_cycle",
  field: "tc_num" });

exports.TransportCycle = mongo.model("transport_cycle", TransportCycle);
exports.Bid = mongo.model("bid", Bid);
exports.TransportCycleCoordinator = mongo.model("transport_cycle_coordinator", TransportCycleCoordinator);
