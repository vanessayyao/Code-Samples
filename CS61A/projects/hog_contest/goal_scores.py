"""The goal score for each player.

When running the contest, this file will be replaced by one that actually
returns the opponent's goal score according to the contest rules.

This version of the file returns None for the opponent's goal score.
"""

import os


def target_score(program_size_in_bytes):
    """The goal for a player based on the length of their strategy in bytes."""
    scaled_score = program_size_in_bytes / 10000 * 300
    return int(min(max(scaled_score, 50), 300))


def score_for_strategy(filename):
    """The goal for a player based on their strategy file."""
    return target_score(os.path.getsize(filename))


# Your goal score based on your strategy file length.
your_goal = score_for_strategy('final_strategy.py')

# The goal score of your opponent based on their strategy file length.
opponent_goal = None