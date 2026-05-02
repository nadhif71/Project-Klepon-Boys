package service

import "github.com/nadhif71/Project-Klepon-Boys/db"

type Services struct {
	Auth    *AuthService
	Concert *ConcertService
	Route   *RouteService
	Hotel   *HotelService
	Ticket  *TiketService
}

func NewServices(queries *db.Queries, jwtSecret []byte) *Services {
	return &Services{
		Auth:    NewAuthService(queries, jwtSecret),
		Concert: NewConcertService(queries),
		Route:   NewRouteService(queries),
		Hotel:   NewHotelServices(queries),
		Ticket:  NewTiketService(queries),
	}
}
