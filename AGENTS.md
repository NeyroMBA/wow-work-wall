# Architecture rules

- Initialize Yandex.Metrika once in the shared HTML entry and record subsequent client-side page visits through a single component inside BrowserRouter, to cover all routes without duplicate initial visits.