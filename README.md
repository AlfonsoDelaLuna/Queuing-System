# Queue Management System
A simple, premium-looking queuing system built with PHP, MySQL, and Vanilla JS. The admin can create the queue and it will display on the queueing screen.

## Requirements
- XAMPP (or any PHP/MySQL environment)
- MySQL Server running on port 3306

## Setup
1. **Start MySQL**: Open XAMPP Control Panel and start the **Apache** and **MySQL** modules.
2. **Database Setup**:
   Open your browser and navigate to:
   `http://localhost/Queing_System/setup.php`
   
   Or run from terminal:
   ```bash
   php setup.php
   ```
   This will create the `queue_system` database and `queue_items` table.

## Usage
- **Admin Interface**: `http://localhost/Queing_System/admin.php`
  - Add customers to the queue.
  - Call them (Alert).
  - Mark as Serving/Done.
  - Edit names or remove items.

- **Display Interface**: `http://localhost/Queing_System/display.php`
  - Open this on a separate screen/window.
  - It automatically updates every 2 seconds.
  - Shows the current serving number and the waiting list.
