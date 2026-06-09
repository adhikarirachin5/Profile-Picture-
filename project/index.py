import pygame
import math
import sys
from road import road, draw_lane_markings
from car import car, control,sensor
from road import road, draw_lane_markings, update_and_draw_oncoming


# inside your loop:


pygame.init()

screen = pygame.display.set_mode((800, 800))
pygame.display.set_caption("Driving Car")
clock = pygame.time.Clock()
running = True

x_position, y_position = 375, 600
degree = 0.5
speed = 2
offset = 0

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((34, 139, 34))

    road(screen)
    x_position, y_position, degree, speed = control(screen, x_position, y_position, degree, speed)

    
    # Lock car vertically so road scrolls instead
    y_position = 600

    draw_lane_markings(screen, offset, speed)
    car(screen, x_position, y_position, degree)
    sensor(screen, x_position, y_position, degree)  

   

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit()