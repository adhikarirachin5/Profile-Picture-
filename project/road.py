import pygame
import random as rnd

road_offset = 0

def road(screen):
    # Road
    pygame.draw.rect(screen, (60, 60, 60), (100, 0, 600, 800))

    # Grass
    pygame.draw.rect(screen, (34, 139, 34), (0,   0, 100, 800))
    pygame.draw.rect(screen, (34, 139, 34), (700, 0, 100, 800))

    # Left kerb stripes
    for i in range(20):
        color = (255, 0, 0) if i % 2 == 0 else (255, 255, 255)
        pygame.draw.rect(screen, color, (90, i * 40, 10, 40))

    # Right kerb stripes
    for i in range(20):
        color = (255, 0, 0) if i % 2 == 0 else (255, 255, 255)
        pygame.draw.rect(screen, color, (700, i * 40, 10, 40))


def draw_lane_markings(screen, offset, speed):
    global road_offset

    road_offset = (road_offset + speed) % 40

    lane_divider = (255, 255, 255)
    lane_right = 610
    lane_left  = 190

    # Solid side lines
    pygame.draw.line(screen, lane_divider, (lane_right, 0), (lane_right, 800), 3)
    pygame.draw.line(screen, lane_divider, (lane_left,  0), (lane_left,  800), 3)

    # Scrolling dashed center line
    for j in range(-40, 840, 40):
        y = j + road_offset
        pygame.draw.line(screen, lane_divider, (400, y), (400, y + 20), 3)



# Spawn a new oncoming car


def update_and_draw_oncoming(screen, speed):
    spawn_oncoming(speed)
    for car in oncoming_cars[:]:                # copy so we can remove safely
        car[1] += speed + 3                     # move down faster than road scroll
        # Draw oncoming car (red)
        pygame.draw.rect(screen, (200, 0, 0), (car[0] - 25, car[1] - 50, 50, 100), border_radius=8)
        if car[1] > 860:                        # remove when off screen
            oncoming_cars.remove(car)