This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

Earthquake Tracker is a project built to see earthquake events that have happened around the globe in the last day and week.

Events are rendered and visually styled according to magnitude on a map layer, from where they can be selected and compared with other events.

A bite-sized breakdown of the day and week is also available - yay factoids!

I built this because I spend a lot of time reading and thinking about earthquakes, volcanoes, and all types of natural events, and I thought it would be cool to see them on a map.

### Stack

- Next.js
- Mapbox - `mapbox-gl` and `react-map-gl`
- Tailwind for styles
- Jotai for state management

### Features

- **Real-time Data**: Displays earthquake data for the last day and week.
- **Interactive Map**: Allows users to select and compare earthquake events visually.
- **Magnitude Styling**: Events are styled according to their magnitude.
- **Factoids**: Provides a concise breakdown of earthquake activity.

### Usage

- **Viewing Earthquakes**: Open the map to see recent earthquake events.
- **Selecting Events**: Click on an event to see details and compare it with others in a overlay tool panel.
- **Factoids**: Check out the breakdown section for quick facts about recent activity.

### Resources

- Earthquake data, including GeoJSON features, are sourced from [the USGS](https://www.usgs.gov/)
