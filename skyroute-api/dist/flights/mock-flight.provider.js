"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockFlightProvider = void 0;
const common_1 = require("@nestjs/common");
let MockFlightProvider = class MockFlightProvider {
    async searchFlights(query) {
        return Array.from({ length: 5 }).map((_, i) => ({
            id: `mock-offer-${i}-${Date.now()}`,
            airline: ['Emirates', 'Qatar Airways', 'PIA', 'Turkish Airlines'][i % 4],
            flightNumber: `FL-${100 + i}`,
            origin: query.origin,
            destination: query.destination,
            departureDate: query.departureDate,
            departureTime: `0${8 + i}:00`,
            arrivalTime: `1${2 + i}:30`,
            duration: `${2 + i}h ${15 * i}m`,
            price: 75000 + i * 5000,
            currency: 'PKR',
            stops: i % 2 === 0 ? 0 : 1,
        }));
    }
};
exports.MockFlightProvider = MockFlightProvider;
exports.MockFlightProvider = MockFlightProvider = __decorate([
    (0, common_1.Injectable)()
], MockFlightProvider);
//# sourceMappingURL=mock-flight.provider.js.map