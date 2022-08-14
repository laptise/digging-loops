import {
  Button,
  ButtonGroup,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Rating,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { FC, useState } from "react";

const RadioButtons: FC<{ values: { label: string; value: string }[] }> = ({ values }) => {
  const [pickedVal, setPickedVal] = useState<string>("");
  return (
    <ButtonGroup orientation="vertical" variant="outlined" aria-label="outlined button group">
      {values.map(({ label, value }) => (
        <Button
          variant={pickedVal === value ? "contained" : "outlined"}
          key={value}
          onClick={() => setPickedVal(value)}
          sx={{ width: 100 }}
          size="small"
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

const CheckboxButtons: FC<{ values: { label: string; value: string }[] }> = ({ values }) => {
  const [pickedVal, setPickedVal] = useState<string[]>([]);
  return (
    <ButtonGroup orientation="horizontal" variant="outlined" aria-label="outlined button group">
      {values.map(({ label, value }) => {
        const isPicked = pickedVal.includes(value);
        const pickToggle = () => {
          const newArr = isPicked ? [...pickedVal.filter((x) => x !== value)] : [...pickedVal, value];
          setPickedVal(newArr);
        };
        return (
          <Button variant={isPicked ? "contained" : "outlined"} key={value} onClick={pickToggle} style={{ minWidth: 80 }} size="small">
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

const SearchPanel = () => {
  return (
    <Box
      style={{
        width: 800,
        backgroundColor: "white",
        margin: "auto",
        position: "absolute" as "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
      }}
    >
      <DialogTitle>검색</DialogTitle>
      <Stack sx={{ p: 2 }} spacing={2}>
        <Stack direction="row" spacing={2}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">검색대상</FormLabel>
            <RadioButtons
              values={[
                { label: "샘플", value: "1" },
                { label: "루프", value: "2" },
                { label: "음원", value: "3" },
              ]}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">분위기</FormLabel>
            <CheckboxButtons
              values={[
                { label: "상쾌", value: "1" },
                { label: "신남", value: "2" },
                { label: "깜찍", value: "3" },
                { label: "행복", value: "4" },
              ]}
            />
            <CheckboxButtons
              values={[
                { label: "공포", value: "1" },
                { label: "역동", value: "2" },
                { label: "장엄", value: "3" },
                { label: "분노", value: "4" },
              ]}
            />
            <CheckboxButtons
              values={[
                { label: "슬픔", value: "1" },
                { label: "몽환", value: "2" },
                { label: "심플", value: "3" },
                { label: "복잡", value: "4" },
              ]}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">악기</FormLabel>
            <CheckboxButtons
              values={[
                { label: "기타", value: "1" },
                { label: "베이스", value: "2" },
                { label: "드럼", value: "3" },
                { label: "보컬", value: "4" },
              ]}
            />
            <CheckboxButtons
              values={[
                { label: "브라스", value: "5" },
                { label: "스트링", value: "6" },
                { label: "플럭", value: "7" },
                { label: "게이트", value: "8" },
              ]}
            />
            <CheckboxButtons
              values={[
                { label: "Sine", value: "9" },
                { label: "Saw", value: "10" },
                { label: "Sqaure", value: "11" },
                { label: "LFO", value: "12" },
              ]}
            />
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">BPM</FormLabel>
            <RangeSlider />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">마디수</FormLabel>
            <RangeSlider />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">박자</FormLabel>
            <TempoSelect />
          </FormControl>
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <Typography>검색어</Typography>
          <TextField placeholder="입력" />
        </Stack>
        <Divider />
        <Stack>
          <Stack direction="row" alignItems={"center"} spacing={2}>
            <Typography variant="subtitle1">정렬기준</Typography>
            <SortSelect />
            <Typography variant="subtitle1">정렬순서</Typography>
            <SortOrderSelect />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

function TempoSelect() {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select id="demo-simple-select" value={age} onChange={handleChange} size="small">
          <MenuItem value={"24"}>2/4</MenuItem>
          <MenuItem value={"34"}>3/4</MenuItem>
          <MenuItem value={"44"}>4/4</MenuItem>
          <MenuItem value={"48"}>4/8</MenuItem>
          <MenuItem value={"68"}>6/8</MenuItem>
          <MenuItem value={"88"}>8/8</MenuItem>
          <MenuItem value={"other"}>기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function SortSelect() {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select id="demo-simple-select" value={age} onChange={handleChange} size="small">
          <MenuItem value={"44"}>판매순</MenuItem>
          <MenuItem value={"48"}>다운로드순</MenuItem>
          <MenuItem value={"68"}>매치순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function SortOrderSelect() {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select id="demo-simple-select" value={age} onChange={handleChange} size="small">
          <MenuItem value={"24"}>높은 순서</MenuItem>
          <MenuItem value={"34"}>낮은 순서</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function valuetext(value: number) {
  return `${value}°C`;
}

function RangeSlider() {
  const [value, setValue] = useState<number[]>([80, 120]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        min={40}
        max={200}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

const labels: { [index: string]: string } = {
  0.5: "0.5점이상",
  1: "1점이상",
  1.5: "1.5점이상",
  2: "2점이상",
  2.5: "2.5점이상",
  3: "3점이상",
  3.5: "3.5점이상",
  4: "4점이상",
  4.5: "4.5점이상",
  5: "5점만",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function HoverRating() {
  const [value, setValue] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 300,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
    </Box>
  );
}

export default SearchPanel;
