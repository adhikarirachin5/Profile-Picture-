import pygame 
import math 

def car(screen, x_position, y_position, degree):
    car_width = 50
    car_height = 100
    car_color = (30, 30, 30)
    window_color = (100, 100, 255)
    wheel_color = (50, 50, 50)

    car_surface = pygame.Surface((car_width, car_height), pygame.SRCALPHA)
    
    # Body
    pygame.draw.rect(car_surface, car_color, (0, 0, car_width, car_height), border_radius=10)
    
    # Windshield
    pygame.draw.rect(car_surface, window_color, (8, 10, 34, 20), border_radius=4)
    
    # Rear window
    pygame.draw.rect(car_surface, window_color, (8, 70, 34, 20), border_radius=4)
    
    # Wheels
    wheel_w, wheel_h = 10, 20
    pygame.draw.rect(car_surface, wheel_color, (-wheel_w + 4, 5,   wheel_w, wheel_h), border_radius=3)
    pygame.draw.rect(car_surface, wheel_color, (car_width - 4, 5,  wheel_w, wheel_h), border_radius=3)
    pygame.draw.rect(car_surface, wheel_color, (-wheel_w + 4, 75,  wheel_w, wheel_h), border_radius=3)
    pygame.draw.rect(car_surface, wheel_color, (car_width - 4, 75, wheel_w, wheel_h), border_radius=3)

    # Headlights
    pygame.draw.rect(car_surface, (255, 255, 150), (6,  4, 12, 6), border_radius=2)
    pygame.draw.rect(car_surface, (255, 255, 150), (32, 4, 12, 6), border_radius=2)

    # Taillights
    pygame.draw.rect(car_surface, (255, 50, 50), (6,  90, 12, 6), border_radius=2)
    pygame.draw.rect(car_surface, (255, 50, 50), (32, 90, 12, 6), border_radius=2)

    rotated_surface = pygame.transform.rotate(car_surface, -degree)
    rotated_rect = rotated_surface.get_rect(center=(x_position, y_position))
    screen.blit(rotated_surface, rotated_rect)


def control(screen, x_position, y_position, degree, speed):
    acceleration = 0.5
    friction = 0.03
    maxspeed = 6
    car_length = 40

    keys = pygame.key.get_pressed()

    if keys[pygame.K_UP]:
        speed += acceleration
        if speed > maxspeed:
            speed = maxspeed
    elif keys[pygame.K_DOWN]:
        speed -= acceleration
        if speed < -maxspeed / 2:
            speed = -maxspeed / 2
    else:
        if speed > 0:
            speed -= friction
            if speed < 0: speed = 0
        elif speed < 0:
            speed += friction
            if speed > 0: speed = 0

    steering = 0
    if speed != 0:
        flip = 1 if speed > 0 else -1
        if keys[pygame.K_RIGHT]:
            steering = 0.03 * flip
        if keys[pygame.K_LEFT]:
            steering = -0.03 * flip

    back_x  = x_position - math.sin(math.radians(degree)) * car_length / 2
    back_y  = y_position + math.cos(math.radians(degree)) * car_length / 2
    front_x = x_position + math.sin(math.radians(degree)) * car_length / 2
    front_y = y_position - math.cos(math.radians(degree)) * car_length / 2

    back_x  += math.sin(math.radians(degree)) * speed
    back_y  -= math.cos(math.radians(degree)) * speed

    front_x += math.sin(math.radians(degree) + steering) * speed
    front_y -= math.cos(math.radians(degree) + steering) * speed

    x_position = (back_x + front_x) / 2
    y_position = (back_y + front_y) / 2
    degree     = math.degrees(math.atan2(front_x - back_x, back_y - front_y))

    # Left and right wall boundaries
    car_half_width = 25
    if x_position - car_half_width < 100:
        x_position = 100 + car_half_width
        speed = 0
    if x_position + car_half_width > 700:
        x_position = 700 - car_half_width
        speed = 0

    # Top and bottom screen limits
    car_half_height = 50
    if y_position - car_half_height < 0:
        y_position = car_half_height
    if y_position + car_half_height > 800:
        y_position = 800 - car_half_height

    return x_position, y_position, degree, speed

def sensor(screen, x, y, degree):
    maxdistance = 200
    angles = [-60,-30, 0, 30,60]
    for offset in angles:
        rad = math.radians(degree + offset)
        end_x = x + math.sin(rad) * maxdistance
        end_y = y - math.cos(rad) * maxdistance
        pygame.draw.line(screen, (0, 255, 0), (x, y), (end_x, end_y), 1)