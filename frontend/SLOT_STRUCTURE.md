# Slot Structure Documentation

## Overview

The Attendance Monitor system now uses **70 unique slot codes** to represent all possible class time slots across a week:

- **7 days** (Monday through Sunday)
- **10 classes per day** (8 AM to 6 PM, 1-hour intervals)
- **Total: 70 unique slot codes**

## Slot Code Format

Each slot code consists of:
- **Letter**: Represents the day of the week (A=Monday, B=Tuesday, etc.)
- **Number**: Represents the time slot (1-10, corresponding to 8 AM - 6 PM)

## Complete Slot Mapping

### Monday (A1-A10)
| Slot | Time | Description |
|------|------|-------------|
| A1   | 08:00-09:00 | First class of Monday |
| A2   | 09:00-10:00 | Second class of Monday |
| A3   | 10:00-11:00 | Third class of Monday |
| A4   | 11:00-12:00 | Fourth class of Monday |
| A5   | 12:00-13:00 | Fifth class of Monday |
| A6   | 13:00-14:00 | Sixth class of Monday |
| A7   | 14:00-15:00 | Seventh class of Monday |
| A8   | 15:00-16:00 | Eighth class of Monday |
| A9   | 16:00-17:00 | Ninth class of Monday |
| A10  | 17:00-18:00 | Tenth class of Monday |

### Tuesday (B1-B10)
| Slot | Time | Description |
|------|------|-------------|
| B1   | 08:00-09:00 | First class of Tuesday |
| B2   | 09:00-10:00 | Second class of Tuesday |
| B3   | 10:00-11:00 | Third class of Tuesday |
| B4   | 11:00-12:00 | Fourth class of Tuesday |
| B5   | 12:00-13:00 | Fifth class of Tuesday |
| B6   | 13:00-14:00 | Sixth class of Tuesday |
| B7   | 14:00-15:00 | Seventh class of Tuesday |
| B8   | 15:00-16:00 | Eighth class of Tuesday |
| B9   | 16:00-17:00 | Ninth class of Tuesday |
| B10  | 17:00-18:00 | Tenth class of Tuesday |

### Wednesday (C1-C10)
| Slot | Time | Description |
|------|------|-------------|
| C1   | 08:00-09:00 | First class of Wednesday |
| C2   | 09:00-10:00 | Second class of Wednesday |
| C3   | 10:00-11:00 | Third class of Wednesday |
| C4   | 11:00-12:00 | Fourth class of Wednesday |
| C5   | 12:00-13:00 | Fifth class of Wednesday |
| C6   | 13:00-14:00 | Sixth class of Wednesday |
| C7   | 14:00-15:00 | Seventh class of Wednesday |
| C8   | 15:00-16:00 | Eighth class of Wednesday |
| C9   | 16:00-17:00 | Ninth class of Wednesday |
| C10  | 17:00-18:00 | Tenth class of Wednesday |

### Thursday (D1-D10)
| Slot | Time | Description |
|------|------|-------------|
| D1   | 08:00-09:00 | First class of Thursday |
| D2   | 09:00-10:00 | Second class of Thursday |
| D3   | 10:00-11:00 | Third class of Thursday |
| D4   | 11:00-12:00 | Fourth class of Thursday |
| D5   | 12:00-13:00 | Fifth class of Thursday |
| D6   | 13:00-14:00 | Sixth class of Thursday |
| D7   | 14:00-15:00 | Seventh class of Thursday |
| D8   | 15:00-16:00 | Eighth class of Thursday |
| D9   | 16:00-17:00 | Ninth class of Thursday |
| D10  | 17:00-18:00 | Tenth class of Thursday |

### Friday (E1-E10)
| Slot | Time | Description |
|------|------|-------------|
| E1   | 08:00-09:00 | First class of Friday |
| E2   | 09:00-10:00 | Second class of Friday |
| E3   | 10:00-11:00 | Third class of Friday |
| E4   | 11:00-12:00 | Fourth class of Friday |
| E5   | 12:00-13:00 | Fifth class of Friday |
| E6   | 13:00-14:00 | Sixth class of Friday |
| E7   | 14:00-15:00 | Seventh class of Friday |
| E8   | 15:00-16:00 | Eighth class of Friday |
| E9   | 16:00-17:00 | Ninth class of Friday |
| E10  | 17:00-18:00 | Tenth class of Friday |

### Saturday (F1-F10)
| Slot | Time | Description |
|------|------|-------------|
| F1   | 08:00-09:00 | First class of Saturday |
| F2   | 09:00-10:00 | Second class of Saturday |
| F3   | 10:00-11:00 | Third class of Saturday |
| F4   | 11:00-12:00 | Fourth class of Saturday |
| F5   | 12:00-13:00 | Fifth class of Saturday |
| F6   | 13:00-14:00 | Sixth class of Saturday |
| F7   | 14:00-15:00 | Seventh class of Saturday |
| F8   | 15:00-16:00 | Eighth class of Saturday |
| F9   | 16:00-17:00 | Ninth class of Saturday |
| F10  | 17:00-18:00 | Tenth class of Saturday |

### Sunday (G1-G10)
| Slot | Time | Description |
|------|------|-------------|
| G1   | 08:00-09:00 | First class of Sunday |
| G2   | 09:00-10:00 | Second class of Sunday |
| G3   | 10:00-11:00 | Third class of Sunday |
| G4   | 11:00-12:00 | Fourth class of Sunday |
| G5   | 12:00-13:00 | Fifth class of Sunday |
| G6   | 13:00-14:00 | Sixth class of Sunday |
| G7   | 14:00-15:00 | Seventh class of Sunday |
| G8   | 15:00-16:00 | Eighth class of Sunday |
| G9   | 16:00-17:00 | Ninth class of Sunday |
| G10  | 17:00-18:00 | Tenth class of Sunday |

## Day-Letter Mapping

| Day | Letter | Slot Range |
|-----|--------|------------|
| Monday | A | A1-A10 |
| Tuesday | B | B1-B10 |
| Wednesday | C | C1-C10 |
| Thursday | D | D1-D10 |
| Friday | E | E1-E10 |
| Saturday | F | F1-F10 |
| Sunday | G | G1-G10 |

## Time-Number Mapping

| Number | Time | Description |
|--------|------|-------------|
| 1 | 08:00-09:00 | First hour of the day |
| 2 | 09:00-10:00 | Second hour of the day |
| 3 | 10:00-11:00 | Third hour of the day |
| 4 | 11:00-12:00 | Fourth hour of the day |
| 5 | 12:00-13:00 | Fifth hour of the day (Noon) |
| 6 | 13:00-14:00 | Sixth hour of the day |
| 7 | 14:00-15:00 | Seventh hour of the day |
| 8 | 15:00-16:00 | Eighth hour of the day |
| 9 | 16:00-17:00 | Ninth hour of the day |
| 10 | 17:00-18:00 | Tenth hour of the day |

## Usage Examples

### Example 1: Monday 9 AM Class
- **Slot Code**: A2
- **Time**: 09:00-10:00
- **Day**: Monday

### Example 2: Friday 2 PM Class
- **Slot Code**: E7
- **Time**: 14:00-15:00
- **Day**: Friday

### Example 3: Wednesday 12 PM Class
- **Slot Code**: C5
- **Time**: 12:00-13:00
- **Day**: Wednesday

## Benefits of This Structure

1. **Unique Identification**: Each slot has a completely unique code
2. **Easy to Understand**: Letter indicates day, number indicates time
3. **Scalable**: Easy to add more time slots if needed
4. **Database Friendly**: Simple string format for database storage
5. **Human Readable**: Easy for users to understand and remember

## Implementation Notes

- The frontend automatically maps days to their corresponding slot codes
- The timetable component displays the correct slots for each day
- Attendance tracking works with the unique slot codes
- The backend API accepts these slot codes for attendance marking 